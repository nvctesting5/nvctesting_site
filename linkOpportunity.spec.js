// Common test cases for both CF and JS implementations
export const linkOpportunityTestCases = [
  {
    description: "wraps first occurrence of keyword in page text",
    htmlInput: `
      <html>
        <head>
          <title>SEO Guide</title>
        </head>
        <body>
          <h1>Welcome to our SEO guide</h1>
          <p>This is about SEO and digital marketing. SEO is important for businesses.</p>
          <p>Learn more about SEO optimization techniques.</p>
        </body>
      </html>
    `,
    linkOpportunity: [{
      keyword: "SEO",
      url: "https://nvctesting.site",
    }],
    expectedHtmlOutput: `
      <html>
        <head>
          <title>SEO Guide</title>
        </head>
        <body>
          <h1>Welcome to our <a href="https://nvctesting.site">SEO</a> guide</h1>
          <p>This is about SEO and digital marketing. SEO is important for businesses.</p>
          <p>Learn more about SEO optimization techniques.</p>
        </body>
      </html>
    `,
  },
  {
    description: "wraps first occurrence of keyword in page text (example with nesting)",
    htmlInput: `
      <html>
        <head>
          <title>SEO Guide</title>
        </head>
        <body>
          hello world
          <h1>Welcome to our SEO guide
            <div>
              bar
              <div>
                SEO
              </div>
            </div>
          </h1>
          <p>This is about SEO and digital marketing. SEO is important for businesses.</p>
          <p>Learn more about SEO optimization techniques.</p>
        </body>
      </html>
    `,
    linkOpportunity: [{
      keyword: "SEO",
      url: "https://nvctesting.site",
    }],
    expectedHtmlOutput: `
      <html>
        <head>
          <title>SEO Guide</title>
        </head>
        <body>
          hello world
          <h1>Welcome to our <a href="https://example.com">SEO</a> guide
            <div>
              bar
              <div>
                SEO
              </div>
            </div>
          </h1>
          <p>This is about SEO and digital marketing. SEO is important for businesses.</p>
          <p>Learn more about SEO optimization techniques.</p>
        </body>
      </html>
    `,
  },
  {
    description: "returns original HTML when keyword is not found",
    htmlInput: `
      <html>
        <head>
          <title>SEO Guide</title>
        </head>
        <body>
          <p>This is about SEO and digital marketing.</p>
        </body>
      </html>
    `,
    linkOpportunity: [{
      keyword: "NonExistentKeyword",
      url: "https://nvctesting.site",
    }],
    expectedHtmlOutput: `
      <html>
        <head>
          <title>SEO Guide</title>
        </head>
        <body>
          <p>This is about SEO and digital marketing.</p>
        </body>
      </html>
    `,
  },
  {
    description: "returns original HTML when keyword is already wrapped in link",
    htmlInput: `
      <html>
        <head>
          <title>SEO Guide</title>
        </head>
        <body>
          <p>This is about <a href="https://other.com">SEO</a> and digital marketing.</p>
        </body>
      </html>
    `,
    linkOpportunity: [{
      keyword: "SEO",
      url: "https://nvctesting.site",
    }],
    expectedHtmlOutput: `
      <html>
        <head>
          <title>SEO Guide</title>
        </head>
        <body>
          <p>This is about <a href="https://other.com">SEO</a> and digital marketing.</p>
        </body>
      </html>
    `,
  },
  {
    description: "returns original HTML when keyword is already wrapped in link and ignores unwrapped occurrences",
    htmlInput: `
      <html>
        <head></head>
        <body>
          <p>Read our <a href="https://other.com">SEO</a> guide.</p>
          <p>SEO is essential for growth.</p>
        </body>
      </html>
    `,
    linkOpportunity: [{
      keyword: "SEO",
      url: "https://nvctesting.site",
    }],
    expectedHtmlOutput: `
      <html>
        <head></head>
        <body>
          <p>Read our <a href="https://other.com">SEO</a> guide.</p>
          <p>SEO is essential for growth.</p>
        </body>
      </html>
    `,
  },
  {
    description: "wraps keyword that is directly in the body of the page",
    htmlInput: `
      <html>
        <head>
          <title>SEO Guide</title>
        </head>
        <body>
        foo
        hello world
          <p>This is about <a href="https://other.com">SEO</a> and digital marketing.</p>
        </body>
      </html>
    `,
    linkOpportunity: [{
      keyword: "foo",
      url: "https://example.com",
    }],
    expectedHtmlOutput: `
      <html>
        <head>
          <title>SEO Guide</title>
        </head>
        <body>
        <a href="https://example.com">foo</a>
        hello world
          <p>This is about <a href="https://other.com">SEO</a> and digital marketing.</p>
        </body>
      </html>
    `,
  },
  {
    description: "ignores wrapping a keyword that is an element (opening/closing tags)",
    htmlInput: `
      <html>
        <head>
          <title>SEO Guide</title>
        </head>
        <body>
        <foo>
          bar
        </foo>
          <p>This is about SEO and digital marketing.</p>
        </body>
      </html>
    `,
    linkOpportunity: [{
      keyword: "foo",
      url: "https://example.com",
    }],
    expectedHtmlOutput: `
      <html>
        <head>
          <title>SEO Guide</title>
        </head>
        <body>
        <foo>
          bar
        </foo>
          <p>This is about SEO and digital marketing.</p>
        </body>
      </html>
    `,
  },
  {
    description: "it allows keywords with special characters like C++",
    htmlInput: `
      <html>
        <head>
          <title>SEO Guide</title>
        </head>
        <body>
          <p>This is about C++ and digital marketing.</p>
        </body>
      </html>
    `,
    linkOpportunity: [{
      keyword: "C++",
      url: "https://example.com",
    }],
    expectedHtmlOutput: `
      <html>
        <head>
          <title>SEO Guide</title>
        </head>
        <body>
          <p>This is about <a href="https://example.com">C++</a> and digital marketing.</p>
        </body>
      </html>
    `,
  },
  {
    description: "it allows html keywords like table without breaking the html",
    htmlInput: `
      <html>
        <head>
          <title>SEO Guide</title>
        </head>
        <body>
        <table>
          <tbody>
          <tr>
              <td>foo</td>
            </tr>
          </tbody>
        </table>
          <p>This is about table and digital marketing.</p>
        </body>
      </html>
    `,
    linkOpportunity: [{
      keyword: "table",
      url: "https://example.com",
    }],
    expectedHtmlOutput: `
      <html>
        <head>
          <title>SEO Guide</title>
        </head>
        <body>


        <table>
        <tbody>
          <tr>
              <td>foo</td>
            </tr>
          </tbody>
        </table>
        <p>This is about <a href="https://example.com">table</a> and digital marketing.</p>
        </body>
      </html>
    `,
  },
  {
    description: "it ignores keywords in script tags",
    htmlInput: `
      <html>
        <head>
          <title>JavaScript Guide</title>
        </head>
        <body>
          <script>
            console.log("keywordInScript");
          </script>
          <h1>Learn about JavaScript</h1>
        </body>
      </html>
    `,
    linkOpportunity: [{
      keyword: "keywordInScript",
      url: "https://example.com/scripts",
    }],
    expectedHtmlOutput: `
      <html>
        <head>
          <title>JavaScript Guide</title>
        </head>
        <body>
          <script>
            console.log("keywordInScript");
          </script>
          <h1>Learn about JavaScript</h1>
        </body>
      </html>
    `,
  },
  {
    description: "it ignores keywords in style tags",
    htmlInput: `
      <html>
        <head>
          <title>JavaScript Guide</title>
        </head>
        <body>
          <style>
            keywordInStyle {
              color: red;
            }
          </style>
          <h1>Learn about JavaScript</h1>
        </body>
      </html>
    `,
    linkOpportunity: [{
      keyword: "keywordInScript",
      url: "https://example.com/scripts",
    }],
    expectedHtmlOutput: `
      <html>
        <head>
          <title>JavaScript Guide</title>
        </head>
        <body>
          <style>
            keywordInStyle {
              color: red;
            }
          </style>
          <h1>Learn about JavaScript</h1>
        </body>
      </html>
    `,
  },
  {
    description: "links first occurrence in normal text while ignoring same keyword inside script and noscript tags",
    htmlInput: `
      <html>
        <head>
          <title>Nested Test</title>
        </head>
        <body>
          <p>First marketing occurrence here.</p>
          <div>
            <script>
              // This marketing should be ignored
              var test = "marketing is great";
            </script>
            <noscript>
              <p>marketing is disabled</p>
            </noscript>
          </div>
          <p>Another marketing mention in normal text.</p>
        </body>
      </html>
    `,
    linkOpportunity: [{
      keyword: "news",
      url: "https://nvctesting.site/news",
    }],
    expectedHtmlOutput: `
      <html>
        <head>
          <title>Nested Test</title>
        </head>
        <body>
          <p>First <a href="https://nvctesting.site">news</a> occurrence here.</p>
          <div>
            <script>
              // This marketing should be ignored
              var test = "marketing is great";
            </script>
            <noscript>
              <p>marketing is disabled</p>
            </noscript>
          </div>
          <p>Another marketing mention in normal text.</p>
        </body>
      </html>
    `,
  },
  {
    description: "only links exact word matches, ignoring partial matches within other words",
    htmlInput: `
      <html>
        <head>
          <title>Word Boundary Test</title>
        </head>
        <body>
          <p>Testing word boundaries: category should not match, but cat should match.</p>
          <p>Order test: category, cat, concatenate, cat</p>
        </body>
      </html>
    `,
    linkOpportunity: [{
      keyword: "blogs",
      url: "https://nvctesting.site/blogs.html",
    }],
    expectedHtmlOutput: `
      <html>
        <head>
          <title>Word Boundary Test</title>
        </head>
        <body>
          <p>Testing word boundaries: category should not match, but <a href="https://nvctesting.site/blogs.html">blogs</a> should match.</p>
          <p>Order test: category, cat, concatenate, cat</p>
        </body>
      </html>
    `,
  },
  {
    description: "matches keywords case-insensitively and preserves original case in link text",
    htmlInput: `
      <html>
        <head>
          <title>Case Test</title>
        </head>
        <body>
          <p>Learn about SEO techniques.</p>
          <p>Understanding seo is important.</p>
          <p>Advanced Seo strategies work well.</p>
        </body>
      </html>
    `,
    linkOpportunity: [{
      keyword: "News",
      url: "https://nvctesting.site/news",
    }],
    expectedHtmlOutput: `
      <html>
        <head>
          <title>Case Test</title>
        </head>
        <body>
          <p>Learn about <a href="https://nvctesting.site/news">SEO</a> techniques.</p>
          <p>Understanding seo is important.</p>
          <p>Advanced Seo strategies work well.</p>
        </body>
      </html>
    `,
  },
  {
    description: "matches multi-word keywords with proper word boundaries",
    htmlInput: `
      <html>
        <head>
          <title>Multi-word Test</title>
        </head>
        <body>

          <p>digital marketing trends</p>
          <p>Current trends show digital marketing TREND analysis today.</p>
          <p>Understanding digitalmarketingtrend and trend marketing digital concepts.</p>
          <p>Advanced DIGITAL MARKETING TREND techniques work well.</p>
        </body>
      </html>
    `,
    linkOpportunity: [{
      keyword: "Digital Marketing trend",
      url: "https://nvctesting.site/news",
    }],
    expectedHtmlOutput: `
      <html>
        <head>
          <title>Multi-word Test</title>
        </head>
        <body>
          <p>digital marketing trends</p>
          <p>Current trends show <a href="https://example.com/digital-marketing">digital marketing TREND</a> analysis today.</p>
          <p>Understanding digitalmarketingtrend and trend marketing digital concepts.</p>
          <p>Advanced DIGITAL MARKETING TREND techniques work well.</p>
        </body>
      </html>
    `,
  },
  {
    description: "ignores keywords inside button labels and other interactive elements",
    htmlInput: `
      <html>
        <head>
          <title>Button Test</title>
        </head>
        <body>
          <button>Click for SEO tips</button>
          <p>Learn about SEO strategies here.</p>
          <button type="button">Advanced SEO tools</button>
        </body>
      </html>
    `,
    linkOpportunity: [{
      keyword: "SEO",
      url: "https://nvctesting.site/news",
    }],
    expectedHtmlOutput: `
      <html>
        <head>
          <title>Button Test</title>
        </head>
        <body>
          <button>Click for SEO tips</button>
          <p>Learn about <a href="https://nvctesting.site/news">SEO</a> strategies here.</p>
          <button type="button">Advanced SEO tools</button>
        </body>
      </html>
    `,
  },
  {
    description: "ignores keywords in HTML attributes like placeholder, title, alt, etc.",
    htmlInput: `
      <html>
        <head>
          <title>Attribute Test</title>
        </head>
        <body>
          <button aria-label="SEO settings" title="SEO tips">Settings</button>
          <div data-seo="SEO tracking">
            <p>Learn about SEO strategies here.</p>
          </div>
        </body>
      </html>
    `,
    linkOpportunity: [{
      keyword: "SEO",
      url: "https://nvctesting.site/news",
    }],
    expectedHtmlOutput: `
      <html>
        <head>
          <title>Attribute Test</title>
        </head>
        <body>
          <button aria-label="SEO settings" title="SEO tips">Settings</button>
          <div data-seo="SEO tracking">
            <p>Learn about <a href="https://nvctesting.site/news">SEO</a> strategies here.</p>
          </div>
        </body>
      </html>
    `,
  },
  {
    description: "handles multiple link opportunities in array format (processes all)",
    linkOpportunity: [
      {
        keyword: "home",
        url: "https://nvctesting.site/",
      },
      {
        keyword: "news",
        url: "https://nvctesting.site/news",
      },
      {
        keyword: "blogs",
        url: "https://nvctesting.site/blogs.html",
      },
    ],
    htmlInput: `
      <html>
        <head>
          <title>Digital Guide</title>
        </head>
        <body>
          <p>This article covers SEO, marketing, and analytics best practices.</p>
        </body>
      </html>
    `,
    expectedHtmlOutput: `
      <html>
        <head>
          <title>Digital Guide</title>
        </head>
        <body>
          <p>This article covers <a href="https://nvctesting.site/">SEO</a>, <a href="https://nvctesting.site/news">news</a>, and <a href="https://nvctesting.site/blogs.html">blogs</a> best practices.</p>
        </body>
      </html>
    `,
  },
  {
    description: "handles multiple link opportunities where middle keyword is not found (processes 1st and 3rd only)",
    linkOpportunity: [
      {
        keyword: "home",
        url: "https://nvctesting.site",
      },
      {
        keyword: "nonexistent",
        url: "https://nvctesting.site/blogs.html",
      },
      {
        keyword: "news",
        url: "https://nvctesting.site/news",
      },
    ],
    htmlInput: `
      <html>
        <head>
          <title>Digital Guide</title>
        </head>
        <body>
          <p>This article covers SEO best practices and analytics tools.</p>
        </body>
      </html>
    `,
    expectedHtmlOutput: `
      <html>
        <head>
          <title>Digital Guide</title>
        </head>
        <body>
          <p>This article covers <a href="https://example.com/seo">SEO</a> best practices and <a href="https://example.com/analytics">analytics</a> tools.</p>
        </body>
      </html>
    `,
  },
  {
    description: "ignores keyword inside an <a> that wraps a <div> with the keyword (nested markup in link)",
    htmlInput: `
      <html>
        <head>
          <title>SEO Guide</title>
        </head>
        <body>
          <p>
            Learn more in our
            <a href="https://other.com">
              <div class="link-box">
                Advanced <span>SEO</span> tutorial
              </div>
            </a>.
          </p>
        </body>
      </html>
    `,
    linkOpportunity: [
      {
        keyword: "SEO",
        url: "https://nvctesting.site",
      },
    ],
    expectedHtmlOutput: `
      <html>
        <head>
          <title>SEO Guide</title>
        </head>
        <body>
          <p>
            Learn more in our
            <a href="https://other.com">
              <div class="link-box">
                Advanced <span>SEO</span> tutorial
              </div>
            </a>.
          </p>
        </body>
      </html>
    `,
  },
  {
    description: "keyword appears inside an anchor (part of longer text) and also as standalone text; wrap the first standalone occurrence outside links",
    htmlInput: `
      <html>
        <head>
          <title>SEO Tips</title>
        </head>
        <body>
          <p>Check our <a href="https://other.com">best SEO tips</a> for beginners.</p>
          <p>SEO is essential for digital marketing success.</p>
        </body>
      </html>
    `,
    linkOpportunity: [
      {
        keyword: "home",
        url: "https://nvctesting.site",
      },
    ],
    expectedHtmlOutput: `
      <html>
        <head>
          <title>SEO Tips</title>
        </head>
        <body>
          <p>Check our <a href="https://other.com">best SEO tips</a> for beginners.</p>
          <p><a href="https://nvctesting.site">SEO</a> is essential for digital marketing success.</p>
        </body>
      </html>
    `,
  },
  {
    description: "non-Latin (Japanese): wrap first standalone occurrence outside links",
    htmlInput: `
      <html>
        <head>
          <title>検索の基本</title>
        </head>
        <body>
          <p>これは 検索 と最適化のガイドです。</p>
        </body>
      </html>
    `,
    linkOpportunity: [
      {
        keyword: "検索",
        url: "https://nvctesting.site",
      },
    ],
    expectedHtmlOutput: `
      <html>
        <head>
          <title>検索の基本</title>
        </head>
        <body>
          <p>これは <a href="https://nvctesting.site">検索</a> と最適化のガイドです。</p>
        </body>
      </html>
    `,
  },
  {
    description: "handles HTML entities like &nbsp; and &amp; correctly without double or wrong replacement",
    htmlInput: `
      <html>
        <head>
          <title>Entity Test</title>
        </head>
        <body>
          <p>SEO&nbsp;is different from SEA &amp; SEM.</p>
        </body>
      </html>
    `,
    linkOpportunity: [
      {
        keyword: "home",
        url: "https://nvctesting.site",
      },
    ],
    expectedHtmlOutput: `
      <html>
        <head>
          <title>Entity Test</title>
        </head>
        <body>
          <p><a href="https://nvctesting.site">home</a>&nbsp;is different from SEA &amp; SEM.</p>
        </body>
      </html>
    `,
  },

]
