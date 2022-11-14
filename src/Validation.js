const { ERROR_MESSAGES, LOTTO } = require("./Constants/Constants");

class Validation {
  /**
   * 플레이어가 게임 중 입력 값이 형식에 어긋날 경우 예외를 발생시킵니다.
   * @param {number} playerInput - 플레이어의 입력
   */
  static validatePurchaseAmount(purchaseAmount) {
    if (!this.isValidAmountUnit(purchaseAmount)) {
      throw new ERROR(ERROR_MESSAGES.INVALID_AMOUNT_UNIT);
    }
  }

  static isValidAmountUnit(amount) {
    return amount % LOTTO.PRICE === 0;
  }
  /**
   * 플레이어가 게임 중 당첨 번호, 보너스 번호가 형식에 어긋날 경우 예외를 발생시킵니다.
   * @param {array} winningNumbers - 플레이어가 입력한 당첨 번호
   */
  static validateWinningNumbers(winningNumbers) {
    if (!this.isValidNumberofNumbers(winningNumbers, LOTTO.NUMBER)) {
      throw new Error(ERROR_MESSAGES.INVALID_NUMBER);
    }
    if (!this.isValidRangeOfNumber(winningNumbers)) {
      throw new Error(ERROR_MESSAGES.INVALID_RANGE);
    }
    if (!this.hasUniqueLottoNumber(winningNumbers)) {
      throw new Error(ERROR_MESSAGES.DUPLICATION_NUMBERS);
    }
  }

  /**
   * 플레이어가 게임 중 입력한 당첨 번호가 형식에 어긋날 경우 예외를 발생시킵니다.
   * @param {array} inputNumbers - 당첨 번호
   * @param {number} number - 당첨 번호의 갯수
   */
  static isValidNumberofNumbers(inputNumbers, number) {
    return inputNumbers.length === number;
  }

  static isValidRangeOfNumber(inputNumbers) {
    const isValidRange = (number) => {
      return LOTTO.MIN_RANGE <= number && number <= LOTTO.MAX_RANGE;
    };

    return inputNumbers.map(Number).every(isValidRange);
  }

  static hasUniqueLottoNumber(inputNumbers) {
    return new Set(inputNumbers).size === LOTTO.NUMBER;
  }
}

module.exports = Validation;
