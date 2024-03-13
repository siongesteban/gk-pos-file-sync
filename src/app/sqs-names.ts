import env from './env.json';

export const SqsNames = {
  DOWNLOAD_ORDER_FILE: `${env.env}-${env.restaurantId}-download-order-file`,
};
