import {Page, Locator, expect} from '@playwright/test';

export class FundsPage{
    readonly page : Page;
    TransferFundsBtn: Locator;
    AmountInput: Locator;
    FromAccountSelect: Locator;
    ToAccountSelect: Locator;
    TransferBtn: Locator;
    constructor(page: Page){
        this.page = page;
        this.TransferFundsBtn = page.getByRole('link', { name: 'Transfer Funds' , exact: true });
        this.AmountInput = page.locator('input[id="amount"]');
        this.FromAccountSelect = page.locator('select[id="fromAccountId"]');
        this.ToAccountSelect = page.locator("#toAccountId");
        this.TransferBtn = page.getByRole('button', { name: 'Transfer' });
    }

    async navigateToTransferFunds(){
        await this.TransferFundsBtn.click();
    }
    async transferFunds(amount: number){
        await this.AmountInput.fill(amount.toString());
        await this.ToAccountSelect.click();
        await this.ToAccountSelect.selectOption({index: 1});
        await this.FromAccountSelect.click();
        await this.FromAccountSelect.selectOption({index: 0});
        await this.TransferBtn.click();
    }
    async verifyTransfer(){
        await expect(this.page.getByText('Transfer Complete!')).toBeVisible();
    }
}