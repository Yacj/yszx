/**
 * @description 正则表达式
 * 验证内容
 * - 规则key集合
 * - mobile 手机号
 * - chinese_and_english 匹配：汉字，a-z，A-Z
 * - chinese10 匹配：中文 1～10个中文
 * - website 网址
 * - email 邮箱
 * - character 字符0~254
 * - intNumber 正整数
 * - positiveInt5 正整数 1～5
 * - positiveInt3_decimal2 正整数最多输入3位，小数最多输入2位
 * - negativeInteger 负整数
 * - isNotNegativeFloatNum 匹配非负浮点数
 * - cP 身份证
 * - cPattern 车牌号
 * - number 数字0～30
 * - numeric_letters 数字，字母，数字或字母，字母或数字组合
 * - chinese_numeric_letters 数字，字母，汉字，任意组合
 * - strong_password 密码强度正则，最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符
 * - cname 校验中文姓名
 * - ename 校验英文名 每一个单词首字母都是大写
 * - ip 校验IP地址
 * - ipv4 校验ipv4
 * - color16Reg 16进制颜色校验
 * - mac 校验mac地址是否正确
 * - arr 校验路径中是否存在数组，[]
 */
export const reg = {
  /**
   * 手机号
   */
  mobile: /^(((13[0-9]{1})|(14[5,7,9]{1})|(15[0-3,5-9]{1})|(166)|(17[0-3,5-8]{1})|(18[0-9]{1})|(19[8,9]{1}))+\d{8})$|(^[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?$)/,

  /**
   * 手机号
   */
  phone: /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1})|(19[0-9]{1}))+\d{8})$/,

  /**
   * 匹配：汉字，a-z，A-Z
   */
  chinese_and_english: /^[\u4E00-\u9FA5a-zA-Z]+$/,
  // 匹配中文，英文字母和数字及下划线：^[\u4e00-\u9fa5_a-zA-Z0-9]+$

  /**
   * 匹配：中文 1～10个中文
   */
  chinese10: /^(?:[\u4E00-\u9FA5·]{1,10})$/,

  /**
   * 网址
   */
  website: /^(?=^.{3,255}$)(http(s)?:\/\/)?(www\.)?[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+(:\d+)*(\/\w+\.\w+)*$/,
  /**
   * 匹配昵称 2～12个字符，支持中英文、数字
   */
  nickname: /^[\u4E00-\u9FA5a-zA-Z0-9]{2,12}$/,
  /**
   * 验证码验证 6位数字
   */
  verify_code: /^\d{6}$/,
  /**
   * 密码验证 6～16位，支持大小写字母、数字、特殊字符
   */
  verify_pwd: /^([a-zA-Z0-9_*@#]{6,16})$/,
  /**
   * 邮箱
   */
  email: /^[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?$/,

  // 字符
  character: /^.{0,254}$/,

  /**
   * 正整数
   */
  intNumber: /^[1-9]\d*$/,

  /**
   * 正整数 1～5
   */
  positiveInt5: /^[1-9]\d{0,4}$/,

  /**
   * 正整数最多输入3位，小数最多输入2位
   */
  positiveInt3_decimal2: /^[1-9]\d{0,2}(\.\d{1,2})?$/,

  /**
   * 负整数
   */
  negativeInteger: /^-[1-9]\d*$/,

  /**
   * 匹配非负浮点数
   */
  isNotNegativeFloatNum: /^\d+(\.\d+)?$/,

  /**
   * 身份证
   */
  cP: /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,

  /**
   * 车牌号
   */
  cPattern: /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/,

  /**
   * 数字0～30
   */
  number: /^[0-9]+.{0,1}[0-9]{0,30}$/,

  /**
   * 数字，字母，数字或字母，字母或数字组合
   */
  numeric_letters: /^[0-9a-zA-Z]{0,40}$/g,

  /**
   * 数字，字母，汉字，任意组合
   */
  chinese_numeric_letters: /^[a-zA-Z0-9\u4E00-\u9FA5]+$/,

  /**
   * 密码强度正则，最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符 */
  strong_password: /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/,

  /**
   * 校验中文姓名
   */
  cname: /^[\u4E00-\u9FA5]+(·[\u4E00-\u9FA5]+)*$/,

  /**
   * 校验英文名 每一个单词首字母都是大写
   */
  ename: /^[A-Z][a-z]*(\s[A-Z][a-z]*)*$/,

  /**
   * 校验IP地址
   */
  ip: /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/,

  /**
   * 校验ipv4
   */
  ipv4: /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,

  /**
   * 16进制颜色校验
   */
  color16Reg: /^#([0-9A-F]{3}|[0-9A-F]{4}|[0-9A-F]{6}|[0-9A-F]{8})$/i,

  /**
   * 校验mac地址是否正确
   */
  mac: /^[A-Fa-f\d]{2}:[A-Fa-f\d]{2}:[A-Fa-f\d]{2}:[A-Fa-f\d]{2}:[A-Fa-f\d]{2}:[A-Fa-f\d]{2}$/,

  /**
   * 校验路径中是否存在数组，[]
   */
  arr: /\[(\d*?)\]/gim,
}

/**
 * @description: 校验
 * @param key - reg中的key
 * @param value - 需要校验的值
 * @return {*} - boolean
 * @example:
 *  validate('nickname', '张三')
 */
export function validate(key: keyof typeof reg, value: string): boolean {
  return new RegExp(reg[`${key}`]).test(value)
}
