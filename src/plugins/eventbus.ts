import Vue from 'vue';
export const EventBus = new Vue();

export const EventAction = {
  snapImage: 'snapImage',
  reviewImage: 'reviewImage',
  refreshMainMap: 'refreshMainMap',
  getImageList: 'getImageList',
};
