import test, { expect } from "@playwright/test";

test.describe('Login tests', async () => {

    test('User login with success', async ({ page })=> {

        await page.goto('https://www.saucedemo.com/v1/');
        //Verifica se o titulo da pagina é Swag Labs
        await expect(await page.title()).toBe('Swag Labs');
        //Insere usuario standard_user no campo username
        await page.locator('[data-test="username"]').fill('standard_user');
        //Insere senha secret_sauce do usuario standard_user
        await page.locator('[data-test="password"]').fill('secret_sauce');
        //Clica no botão login
        await page.locator('[id="login-button"]').click();
        //Verifica se esta na pagina correta apos login
        await expect(await page.url()).toBe('https://www.saucedemo.com/v1/inventory.html');
        
        //Verificar se header de produtos tem o texto Products
        const productTitle = await page.locator('.product_label');
        await expect(productTitle).toHaveText('Products');
    } );
    
    test('User insert wrong credencials', async ({ page })=> {
    
        await await page.goto('https://www.saucedemo.com/v1/');
    
        await page.locator('[data-test="username"]').fill('standard_user');
        //Insere senha incorreta do usuario standard_user
        await page.locator('[data-test="password"]').fill('wrongpass');
        await page.locator('[id="login-button"]').click();
    
        //Pega o erro atraves do texto, mas somente se o texto for visivel
        const errorText= await page.getByText(' Epic sadface: Username and password do not match any user in this service')
        await expect(errorText).toBeVisible();
    })
    
})

