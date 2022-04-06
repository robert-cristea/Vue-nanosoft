exports.HR = () => {
  return "https://nanosoft-hr-ekmd8.ondigitalocean.app"; // HR TEST;
  // return 'https://lcma-hr-ucvzi.ondigitalocean.app';
  // return 'https://tpb-erp-hr-32ue3.ondigitalocean.app';
};
exports.identity = () => {
  return "https://identity-bjag3.ondigitalocean.app/connect/token"; // HR;
  // return 'https://tpb-erp-identity-k74ir.ondigitalocean.app/connect/token';
  // return 'https://lcma-identity-cbrit.ondigitalocean.app/connect/token';
  // return "http://192.168.0.200:8080/connect/token";
};

exports.NULL = item => {
  if (item == null) {
    return "";
  } else {
    return item;
  }
};
