import { saveAs } from 'file-saver';
import { Component, ViewChild } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { LazyLoadEvent, MessageService } from 'primeng/api';

import { AuthenticationService } from '~/applicativeService/authentication/service';
import { Trip } from '~/entities/database/trip/trip';
import { TranslationService } from '~/shared/services/translationService';
import { TableService } from '~/shared/services/tableService';
import { ApiResponse } from '~/entities/responses/apiResponse';

import { TripService } from '../../services/tripService';
import { TRIP_HEADER } from '../../config/header';

@Component({
  selector: 'app-trip-list',
  templateUrl: 'template.html',
  animations: [
    trigger('rowExpansionTrigger', [
      state('void', style({
        transform: 'translateX(-10%)',
        opacity: 0,
      })),
      state('active', style({
        transform: 'translateX(0)',
        opacity: 1,
      })),
      transition('* <=> *', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')),
    ]),
  ],
  styleUrls: ['style.scss'],
})

export class TripListComponent {
  trips;
  headList = TRIP_HEADER.main.trip;
  selectedHeadList = TRIP_HEADER.selection.trip;
  driverPassengerHeadList = TRIP_HEADER.main.driverPassenger;
  sortList = TRIP_HEADER.sort.trip;
  columns = [];
  selectedColumns = [];
  subColumns = [];
  subTableTitles = ['Conducteur', 'Passager'];
  total = 30;
  perPage = 10;
  loading = true;
  // exportItems = [{
  //   label: 'CSV',
  //   icon: 'pi pi-file',
  //   command: () => {
  //     this.export('csv');
  //   },
  // },{
  //   label: 'JSON',
  //   icon: 'pi pi-file',
  //   command: () => {
  //     this.export('json');
  //   },
  // }];
  @ViewChild('dt') dt;
  private filters;

  constructor(
    private tripService: TripService,
    private authentificationService: AuthenticationService,
    private translationService: TranslationService,
    private messageService: MessageService,
    private ts: TableService,
  ) {
    this.setColumns();
  }

  applyFilters(mainFilters) {
    Object
      .keys(mainFilters)
      .forEach((key) => {
        this.dt.filter(mainFilters[key]['value'], mainFilters[key]['colName'], mainFilters[key]['filterType']);
      });

    this.filters = this.tripService.formatFiltersFromLazyEvent(this.dt);

    this.get(this.filters);
  }

  getSubArray(a, b) {
    return [a, b];
  }

  getSortableField(field) {
    if (this.sortList.indexOf(field) !== -1) {
      if (field === 'passenger.start.date') {
        return 'passenger.start.datetime';
      }
      return field;
    }
    return null;
  }

  getValue(trip: Trip, keyString) {
    return this.translationService.getTableValue(trip, keyString);
  }

  getKey(title: string) {
    return this.translationService.getTableKey(title);
  }

  hasPermission(permission: string) {
    return this.authentificationService.hasPermission(permission);
  }

  hasAnyGroup(groups: string[]) {
    const group = this.authentificationService.hasAnyGroup(groups);
    return !!group;
  }

  loadLazy(event: LazyLoadEvent) {
    const eventBeforeFormat = this.setDefault(event);
    const filters = this.tripService.formatFiltersFromLazyEvent(eventBeforeFormat);
    this.get(filters);
  }

  export(type) {
    this.tripService
      .export(type, this.filters)
      .subscribe((res) => {
        saveAs(res, `trips.${type}`);
      });
  }

  isNaN(value) {
    return isNaN(value);
  }

  private setColumns() {
    for (const head of this.headList) {
      this.columns.push(this.ts.createColumn(head));
    }
    for (const head of this.selectedHeadList) {
      this.selectedColumns.push(this.ts.createColumn(head));
    }
    for (const head of this.driverPassengerHeadList) {
      this.subColumns.push(this.ts.createColumn(head));
    }
  }

  private get(filters: any[any] = []) {
    this.loading = true;
    this.tripService
      .get(filters)
      .subscribe(
        (response: ApiResponse) => {
          this.setTotal(response.meta);
          this.trips = response.data;
          this.loading = false;
        },
      );
  }

  private setDefault(event: LazyLoadEvent) {
    if (!event.sortField) {
      event.sortField = 'passenger.start.datetime';
      event.sortOrder = -1;
    }
    return event;
  }


  private setTotal(meta) {
    if (meta.hasOwnProperty('pagination')) {
      this.total = meta['pagination']['total'];
      this.perPage = meta['pagination']['per_page'];
    }
  }
}
