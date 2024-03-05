import env from './env.json';

export const SqsNames = {
  DOWNLOAD_MENU_FILE: `${env.env}-${env.restaurantId}-download-menu-file`,
  DOWNLOAD_ORDER_FILE: `${env.env}-${env.restaurantId}-download-order-file`,
};
