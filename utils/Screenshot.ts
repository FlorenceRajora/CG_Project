
interface FolderType {
    type: "API" | "UI" | "E2E"
}


export default async function takeScreenshot(page: any, testInfo: any, type: FolderType) {
    const screenshotPath = `screenshots/${type.type}/${testInfo.title}.png`;
    await page.screenshot({ path: screenshotPath });
}