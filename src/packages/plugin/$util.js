export default {
  /* 获取身份证的出生日期部分 */
  $getBirthdateFromIDCard(idCard) {
    // 假设身份证号码格式为：前6位为地区码，中间8位为出生日期，最后4位为顺序码
    // 实际情况可能有所不同，需要根据实际情况进行调整
    // 获取出生日期部分
    var birthdate = idCard.substring(6, 14);
    // 对日期进行格式化，假设格式为YYYYMMDD
    var formattedBirthdate = birthdate.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3');
    return formattedBirthdate;
  },
};
