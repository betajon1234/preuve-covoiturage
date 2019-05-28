 export const roles = {
  admin: {
    slug: 'admin',
    name: 'Admin',
    permissions: [
      'user.list',
      'user.invite',
      'user.create',
      'user.read',
      'user.update',
      'user.delete',
      'aom.users.add',
      'aom.users.list',
      'aom.users.remove',
      'aom.list',
      'aom.read',
      'aom.update',
      'aom.delete',
      'aom.stats',
      'operator.list',
      'operator.read',
      'journey.read',
      'journey.list',
      'profile.read',
      'profile.update',
      'profile.password',
      'profile.delete',
      'incentive.list',
      'incentive.read',
      'incentive-parameter.list',
      'incentive-parameter.create',
      'incentive-parameter.read',
      'incentive-parameter.update',
      'incentive-parameter.delete',
      'incentive-unit.list',
      'incentive-unit.create',
      'incentive-unit.read',
      'incentive-unit.update',
      'incentive-unit.delete',
      'incentive-policy.list',
      'incentive-policy.create',
      'incentive-policy.read',
      'incentive-policy.update',
      'incentive-policy.delete',
      'incentive-campaign.list',
      'incentive-campaign.create',
      'incentive-campaign.read',
      'incentive-campaign.update',
      'incentive-campaign.delete',
    ],
  },
  user: {
    slug: 'user',
    name: 'User',
    permissions: [
      'aom.stats',
      'user.list',
      'journey.read',
      'journey.list',
      'profile.read',
      'profile.update',
      'profile.password',
      'profile.delete',
      'incentive.list',
      'incentive.read',
      'incentive-parameter.list',
      'incentive-parameter.read',
      'incentive-unit.list',
      'incentive-unit.read',
      'incentive-policy.list',
      'incentive-policy.read',
      'incentive-campaign.list',
      'incentive-campaign.read',
    ],
  },
};
