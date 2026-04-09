import { Locator, test } from "@playwright/test";

export class BaseElement {
    protected readonly locator: Locator;
    protected readonly name: string;

    constructor(locator: Locator, name: string) {
        this.locator = locator;
        this.name = `${name}`;
    }

    get getLocator(): Locator {
        return this.locator;
    }

    get getName(): string {
        return this.name;
    }

    async getText(): Promise<string> {
        return this.locator.innerText();
    }

    async hover(): Promise<void> {
        await test.step(
            `Навести курсор на элемент' [${this.name}]`,
            async () => {
                await this.locator.hover();
            },
            {box: true},
        );
    }

    async isVisible(): Promise<void> {
        await test.step(
            `Убедиться, что [${this.name}] отображается`,
            async () => {
                await this.locator.isVisible();
            },
        )
    }

    async waitForVisibility(): Promise<void> {
        await test.step(
            `Убедиться что [${this.name}] отображается`,
            async () => {
                await this.locator.waitFor({
                    state: 'visible',
                    timeout: 5000
                })
            }
        )
    }

    async waitForInvisibility(): Promise<void> {
        await test.step(
            `Убедиться что [${this.name}] отображается`,
            async () => {
                await this.locator.waitFor({
                    state: 'hidden',
                    timeout: 5000
                })
            }
        )
    }

    async focus(): Promise<void> {
        await test.step(
            `Убедиться что на [${this.name}] установлен фокус`,
            async () => {
                await this.locator.focus();
            },
        );
    }

    async scrollToElementIfNeeded(): Promise<void> {
        await test.step(
            `Проскроллить до [${this.name}]`,
            async () => {
                await this.locator.scrollIntoViewIfNeeded();
            },
        );
    }
}
