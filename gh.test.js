let page;

beforeEach(async () => {
  page = await browser.newPage();
});

afterEach(() => {
  page.close();
});

// Задание 1

describe("Github page tests", () => {
  beforeEach(async () => {
    await page.goto("https://github.com/team");
  });

  test("The h1 header content'", async () => {
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForSelector("h1");
    const title2 = await page.title();
    expect(title2).toEqual("GitHub for teams · Build like the best teams on the planet · GitHub", {timeout: 10000});
  });

  test("The first link attribute", async () => {
    await page.waitForSelector("a");
    const actual = await page.$eval("a", link => link.getAttribute('href') );
    expect(actual).toEqual("#start-of-content", {timeout: 60000});
  });

  test("The page contains Sign in button", async () => {
    const btnSelector = ".btn-large-mktg.btn-mktg";
    await page.waitForSelector(btnSelector, {visible: true});
    const actual = await page.$eval(btnSelector, (link) => link.textContent);
    expect(actual).toContain("Get started with Team");
  }, 40000);
});


// Задание 2

describe("Should check titles for other GitHub pages", () => {
  test("Should find the title on pricing", async () => {
    await page.goto("https://github.com/pricing");
    await page.waitForSelector("h1");
    const title = await page.title();
    expect(title).toContain("Pricing · Plans for every developer · GitHub");
  }, 40000);

  test("Should find the title on sponsors", async () => {
    await page.goto("https://github.com/sponsors");
    await page.waitForSelector("h1");
    const title = await page.title();
    expect(title).toContain("GitHub Sponsors · GitHub");
  }, 40000);

  test("The page contains Introduction to GitHub", async () => {
    await page.goto("https://skills.github.com");
    await page.waitForSelector("h1");
    const btnSelector = (ss = ".btn.btn-primary.btn-large");
    const title = await page.$eval(btnSelector, (link) => link.textContent);
    expect(title).toContain("Introduction to GitHub");
  }, 30000);
});