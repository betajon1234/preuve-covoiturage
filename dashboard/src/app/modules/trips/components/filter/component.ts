import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { TripService } from '~/modules/trips/services/tripService';
import { AuthenticationService } from '~/applicativeService/authentication/service';
import { MAIN } from '~/config/main';
import { DATES } from '~/config/dates';

import { TRIP_HOUR } from '../../config/hour';
import { TRIP_FILTER_DAYS } from '../../config/days';
import { TRIP_MAIN } from '../../config/main';
import { TRIP_DISTANCE } from '../../config/distance';
import { TRIP_HEADER } from '../../config/header';

@Component({
  selector: 'app-trip-filter',
  templateUrl: 'template.html',
  styleUrls: ['style.scss'],
})

export class TripFilterComponent implements OnInit {
  constructor(
    private authenticationService: AuthenticationService,
    private tripService: TripService,
  ) {
    this.tripService = tripService;
  }

  @Input()
  columns;

  dt;
  showMoreFilters;

  @Input()
  set data(val) {
    this.dt = val;
  }

  @Output()
  applyFilters = new EventEmitter();

  minDate = '';
  maxDate = '';

  defaultMinDate: Date;
  defaultMaxDate: Date;

  defaultHourDate: Date;

  minTime = '';
  maxTime = '';

  classes = [];
  operatorIds = [];

  aomIds = [];

  days = TRIP_FILTER_DAYS;
  selectedDays = [];

  showDayFilter = TRIP_MAIN.showDayFilter;
  showTimeFilter = TRIP_MAIN.showTimeFilter;

  distanceMax = TRIP_DISTANCE.max;
  distanceRange = [];
  distanceTimeout: any;

  ages = [];

  /*
   * Saved filters before applyed to query
   */
  filters = {};

  /*
   * Exportet global stringified filter for URI request
   */
  exportFilter:string = null;

  fr = DATES.fr;

  ngOnInit(): void {
    this.defaultMinDate = MAIN.startDate;
    this.defaultMaxDate = new Date();
    this.defaultHourDate = new Date(TRIP_HOUR.defaultDate);
    this.resetVar();
  }

  onDistanceChange(event) {
    if (this.distanceTimeout) {
      clearTimeout(this.distanceTimeout);
    }

    this.distanceTimeout = setTimeout(
      () => {
        this.setDistanceFilter(this.distanceRange);
      },
      250, // tslint:disable-line:no-magic-numbers
    );
  }

  private setDistanceFilter(range) {
    const filter = range.length > 0 ? { people:{ $elemMatch: { $and : [
      { distance: { $gt: range[0] } },
      { distance: { $lt: range[1] } },
    ],
    }}} : null;
    this.addFilter(filter, 'people.distance');
  }

  onDateChange() {
    let isoMinDate: string;
    let isoMaxDate: string;

    if (this.minDate) {
      isoMinDate = new Date(this.minDate).toISOString();
    }

    if (this.maxDate) {
      isoMaxDate = new Date(this.maxDate).toISOString();
    }

    if (this.minDate && this.maxDate) {
      const filter = { $or: [
        { start: { $gt : isoMinDate } },
        { start: { $lt : isoMaxDate } },
      ]};
      this.addFilter(filter, 'start');
    } else if (this.minDate) {
      const filter = { start: isoMinDate };
      this.addFilter(filter, 'start');
    } else if (this.maxDate) {
      const filter = { start: isoMaxDate };
      this.addFilter(filter, 'start');
    }
  }

  /**
   * todo: Not active yet
   */
  onTimeChange() {
    // const isoMinTime = new Date(this.minTime).getHours();
    // const isoMaxTime = new Date(this.maxTime).getHours();
    //
    // if (this.minTime && this.maxTime) {
    //   this.addFilter([isoMinTime, isoMaxTime], 'time', 'gt&lt');
    // } else if (this.minTime) {
    //   this.addFilter(isoMinTime, 'time', 'gt');
    // } else if (this.maxTime) {
    //   this.addFilter(isoMaxTime, 'time', 'lt');
    // }
  }

  /**
   * todo: Not active yet
   */
  onDayChange() {
    //
  }

  filterTown(event) {
    const town = event.target.value;
    const filter = town ? { people:{ $elemMatch: { 'start.town' : { $regex: town } } } } : null;
    this.addFilter(filter, 'people.start.town');
  }

  onClassChange() {
    const filter = this.classes.length > 0 ? { people:{ $elemMatch:{ class: { $in: this.classes } } } } : null;
    this.addFilter(filter, 'people.class');
  }

  onOperatorChange(operatorIds) {
    this.operatorIds = operatorIds;
    const filter = operatorIds.length > 0 ? { operator_id:{ $in : operatorIds } } : null;
    this.addFilter(filter, 'operator_id');
  }

  onAomChange(aomIds) {
    this.aomIds = aomIds;
    const filter = aomIds.length > 0 ? { aom:{ $elemMatch: { _id : { $in : aomIds } } } } : null;
    this.addFilter(filter, 'aom._id');
  }

  onAgeChange() {
    const allAges = ['true', 'false'];
    if (this.ages.indexOf('nc') !== -1) {
      if (this.ages.indexOf('true') !== -1 && this.ages.indexOf('false') !== -1) {
        this.setAgeFilter(allAges, '$in');
      } else if (this.ages.indexOf('true') !== -1) {
        this.setAgeFilter(['false'], '$nin');
      } else if (this.ages.indexOf('false') !== -1) {
        this.setAgeFilter(['true'], '$nin');
      } else {
        this.setAgeFilter(allAges, '$nin');
      }
    } else {
      this.setAgeFilter(this.ages, '$in');
    }
  }

  private setAgeFilter(ages, filterType) {
    const filter = ages.length > 0 ? { people:{ $elemMatch: { 'identity.over_18' : { [filterType] : ages } } } } : null;
    this.addFilter(filter, 'people.identity.over_18');
  }


  addFilter(value, colName) {
    const andFilter = [];
    this.filters[colName] = value;
    Object
      .keys(this.filters)
      .forEach((key) => {
        if (this.filters[key]) {
          andFilter.push(this.filters[key]);
        }
      });
    console.log(andFilter);
    this.exportFilter = JSON.stringify({ $and: andFilter });
  }

  hasAnyGroup(groups: string[]) {
    return !!this.authenticationService.hasAnyGroup(groups);
  }

  apply() {
    this.applyFilters.emit({ main : { value: this.exportFilter, colName: 'main', filterType: 'filter' } });
  }

  reset() {
    this.filters = {};
    this.exportFilter = null;
    this.resetVar();
    this.dt.reset();
    this.applyFilters.emit();
  }

  resetVar() {
    this.distanceRange = [0, TRIP_DISTANCE.max];
    this.selectedDays = this.days.map(value => value.value);
    this.minDate = '';
    this.maxDate = '';
    this.minTime = '';
    this.maxTime = '';
    this.classes = [];
    this.operatorIds = [];
    this.aomIds = [];
    this.ages = [];
  }

  getColumnIndexFromName(colName) {
    return TRIP_HEADER.main.trip.indexOf(colName);
  }
}
