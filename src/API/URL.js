const baseUrl = 'https://buycodestaging.wecansync.com/api';

const ProductInfoURL = (barcode, deviceUUID, disable) =>
  `${baseUrl}/products/${barcode}/get-info?deviceUUID=${deviceUUID}&disableScanCounter=${disable}`;

const deleteScanHistory = deviceUUID =>
  `${baseUrl}/products/delete-scans?deviceUUID=${deviceUUID}`; //Get request

const ClientInfo = () => `${baseUrl}/auth/clients/profile`;

const storyHistory = deviceUUID =>
  `${baseUrl}/products/get-scans?deviceUUID=${deviceUUID}`;

const storyRead = (story_id, uuid) =>
  `${baseUrl}/products/story/${story_id}/view?deviceUUID=${uuid}`;

const getProductInfo = (barcode, deviceUUID, disable) =>
  `${baseUrl}/products/${barcode}/get-info?deviceUUID=${deviceUUID}&disableScanCounter=${disable}`;

const getHistory = deviceUUID =>
  `${baseUrl}/products/get-scans?deviceUUID=${deviceUUID}`;

const chatHistory = (uuid, product_id) =>
  `${baseUrl}/products/get-messages?deviceUUID=${uuid}&product=${product_id}`;

const sendMessages = uuid =>
  `${baseUrl}/products/post-message?deviceUUID=${uuid}`;

export {
  sendMessages,
  chatHistory,
  ProductInfoURL,
  ClientInfo,
  deleteScanHistory,
  storyHistory,
  storyRead,
  getProductInfo,
  getHistory,
};
