import { faker } from '@faker-js/faker';

export class DataGenerator {
  /**
   * **Метод для генерации uuid **
   * Пример: this.uuid(); // => "89bd9d8d-69a6-474e-8f46-7cc8796ed151"
   */
  get uuid(): string {
    return faker.string.uuid();
  }

  /**
   * **Метод для генерации имени**
   * Пример: this.firstName(); // Brando
   */
  firstName(): string {
    return faker.person.firstName();
  }

  /**
   * **Метод для генерации username**
   * Пример: this.username(); // john_doe92
   */
  userName(): string {
    return faker.internet.username();
  }

  /**
   * **Метод для генерации фамилии**
   * Пример: this.lastName(); // Hackett
   */
  lastName(): string {
    return faker.person.lastName();
  }

  /**
   * **Метод для генерации отчества**
   * Пример: this.middleName(); // Kyle
   */
  middleName(): string {
    return faker.person.middleName();
  }

  /**
   * **Метод для генерации адреса электронной почты**
   * Пример: this.email(); // Estrella.OHara76@yandex.ru
   */
  email(): string {
    return faker.internet.email();
  }

  /**
   * **Метод для генерации пароля**
   * Генерирует пароль длиной 8+ символов, содержащий:
   * - латинские буквы (a–z, A–Z)
   * - цифры (0–9)
   * - минимум один специальный символ (!@#$%^&* и т.д.)
   * Пробелы не используются.
   *
   * Пример: this.password(); // aB3kL9m!
   */
  password(): string {
    const lower = 'abcdefghijklmnopqrstuvwxyz';
    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const digits = '0123456789';
    const special = '!@#$%^&*';

    const getRandom = (chars: string) =>
        chars[Math.floor(Math.random() * chars.length)];

    // гарантированные символы
    const required = [
      getRandom(lower),
      getRandom(upper),
      getRandom(digits),
      getRandom(special),
    ];

    // остальная длина
    const allChars = lower + upper + digits + special;
    const remainingLength = 8;

    const rest = Array.from({ length: remainingLength }, () =>
        getRandom(allChars)
    );

    // перемешиваем
    const passwordArray = [...required, ...rest]
        .sort(() => Math.random() - 0.5);

    return passwordArray.join('');
  }

  /**
   * **Метод для генерации слова заданной длины**
   * В качестве входного параметра передается необходимое «кол-во» символов в слове.
   * Пример: this.word(6); // модели
   */
  word(count: number): string {
    return faker.lorem.word(count);
  }

  /**
   * **Метод для генерации существительного**
   * Возвращает существительное произвольно заданной длины.
   * Пример: this.nounWord(8); // negligee
   */
  nounWord(count: number): string {
    return faker.word.noun(count);
  }

  /**
   * **Метод для генерации названия профессии**
   * Пример: this.jobTitle(); // Главный страховой консультант
   */
  jobTitle(): string {
    return faker.person.jobTitle();
  }

  /**
   * **Метод для генерации имени продукта**
   * Пример: this.productName(); // Невероятный Неодимовый Кулон
   */
  productName(): string {
    return faker.commerce.productName();
  }

  /**
   * **Метод для генерации наименования компании**
   * Пример: this.companyName(); // ООО ПромРусЛимитед
   */
  companyName(): string {
    return faker.company.name();
  }

  /**
   * **Метод для получения даты в формате dd.mm.yyyy
   */
  today(): string {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    return dd + '.' + mm + '.' + yyyy;
  }

  /**
   * **Метод для генерации ссылки**
   * Пример: this.url(); // http://fuzzy-pinkie.net
   */
  url(): string {
    return faker.internet.url();
  }
}
