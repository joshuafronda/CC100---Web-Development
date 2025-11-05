import { Section } from './types';

export const reviewerContent: Section[] = [
  {
    id: 'intro',
    title: 'Basic Web Development',
    items: [
      { type: 'paragraph', content: 'This module introduces the fundamentals of web development, focusing on HTML for structure and CSS for styling. These are the building blocks of modern web pages.' },
    ],
  },
  {
    id: 'html-intro',
    title: 'Hypertext Markup Language (HTML)',
    items: [
      { type: 'paragraph', content: 'HTML is one of the three main components of modern web pages, along with Cascading Style Sheets (CSS) and JavaScript. It indicates to the browser what elements should be included in the webpage.' },
      { type: 'list', content: [
          'It is a language for specifying how text and graphics appear on a web page.',
          'It is a textual language that includes special markup tags such as `<title>My Page</title>`.',
          'HTML code is stored in a simple text file that has either a `.htm` or a `.html` filename extension.'
        ]
      },
      { type: 'quote', content: { text: 'A simple text editor is all you need to learn HTML.' } },
    ],
  },
  {
    id: 'html-basics',
    title: 'HTML Basic Concepts',
    items: [
        { type: 'paragraph', content: '**`<!DOCTYPE>` Declaration**' },
        { type: 'list', content: [
            'Represents the document type and helps browsers display web pages correctly.',
            'It must only appear once, at the top of the page (before any HTML tags).',
            'The declaration is not case-sensitive.'
        ]},
        { type: 'paragraph', content: '**HTML Title (`<title>`)**' },
        { type: 'list', content: [
            'Defines the title of the document, shown in the browser\'s title bar or tab.',
            'The `<title>` tag is required in HTML documents.'
        ]},
        { type: 'paragraph', content: '**HTML Headings (`<h1>` - `<h6>`)**' },
        { type: 'list', content: [
            'Headings are titles or subtitles that you want to display on a webpage.',
            'There are six levels of headings, defined with the `<h1>` to `<h6>` tags.',
            '`<h1>` defines the most important heading, while `<h6>` defines the least important.'
        ]},
        { type: 'paragraph', content: '**HTML Paragraphs (`<p>`)**' },
        { type: 'list', content: [
            'The `<p>` element defines a paragraph.',
            'Paragraphs always start on a new line, and browsers automatically add some white space (a margin) before and after a paragraph.'
        ]},
        { type: 'paragraph', content: '**HTML Comments**' },
        { type: 'list', content: [
            'Comments are not displayed in the browser but can help document your HTML source code.',
            'Comments are written between `<!--` and `-->`.'
        ]},
        { type: 'code', content: { language: 'html', code: `<!-- This is a comment. It will not be displayed. -->` } },
    ]
  },
  {
    id: 'html-attributes',
    title: 'HTML Attributes',
    items: [
      { type: 'paragraph', content: 'Attributes provide additional information about HTML elements and are always specified in the start tag. They usually come in name/value pairs like `name="value"`.' },
      { type: 'list', content: [
          '**`href`**: The `<a>` tag defines a hyperlink. The `href` attribute specifies the URL of the page the link goes to.',
          '**`src`**: The `<img>` tag is used to embed an image. The `src` attribute specifies the path to the image.',
          '**`width` and `height`**: These attributes on `<img>` specify the width and height of the image in pixels.',
          '**`alt`**: The required `alt` attribute for `<img>` specifies an alternate text for an image, if it cannot be displayed.',
          '**`style`**: Used to add inline styles to an element, such as color, font, size, and more.',
          '**`title`**: Defines extra information about an element, shown as a tooltip on mouse-over.',
          '**`lang`**: Declares the language of the Web page in the `<html>` tag.',
        ]
      },
      { type: 'code', content: { language: 'html', code: `<a href="https://www.w3schools.com">Visit W3Schools</a>
<img src="img_girl.jpg" alt="Girl with a jacket" width="500" height="600">
<p style="color:red;" title="I'm a tooltip">This is a red paragraph.</p>` } },
    ],
  },
    {
    id: 'html-formatting',
    title: 'HTML Formatting & Quotations',
    items: [
      { type: 'paragraph', content: 'HTML has several elements for defining text with a special meaning.'},
      { type: 'table', content: [
        ['Tag', 'Description'],
        ['<b>', 'Bold text'],
        ['<strong>', 'Important text (semantically strong)'],
        ['<i>', 'Italic text'],
        ['<em>', 'Emphasized text'],
        ['<mark>', 'Marked or highlighted text'],
        ['<small>', 'Smaller text'],
        ['<del>', 'Deleted text'],
        ['<ins>', 'Inserted text'],
        ['<sub>', 'Subscript text'],
        ['<sup>', 'Superscript text'],
      ]},
      { type: 'paragraph', content: 'For quotations, you can use `<blockquote>` for long quotes, `<q>` for short inline quotes, `<abbr>` for abbreviations, `<address>` for contact information, and `<cite>` to define the title of a creative work.' },
    ]
  },
  {
    id: 'html-colors',
    title: 'HTML Colors',
    items: [
        { type: 'paragraph', content: 'HTML colors can be specified using color names, RGB values, HEX values, HSL values, RGBA values, and HSLA values.' },
        { type: 'list', content: [
            '**Color Names**: Simple and intuitive (e.g., "Red", "Blue"). HTML supports 140 standard color names.',
            '**Background Color**: Set with the `background-color` style property.',
            '**Text Color**: Set with the `color` style property.',
            '**Border Color**: Set with the `border-color` style property.',
            '**RGB Values**: Specified with `rgb(red, green, blue)`, where each parameter is a value between 0 and 255.'
        ]},
        { type: 'code', content: { language: 'html', code: `<h1 style="background-color:DodgerBlue; color:white; border:2px solid Tomato;">Hello World</h1>` } },
    ]
  },
  {
    id: 'html-links',
    title: 'HTML Links',
    items: [
        { type: 'paragraph', content: 'HTML links are hyperlinks. You can click on a link and jump to another document. The `<a>` element\'s `href` attribute is the most important, indicating the link\'s destination.' },
        { type: 'list', content: [
            '**Image as Link**: You can use an image as a link by nesting an `<img>` tag inside an `<a>` tag.',
            '**Button as Link**: You can use a `<button>` tag inside an `<a>` tag to create a clickable button link.',
            '**Bookmarks**: You can create bookmarks to allow readers to jump to specific parts of a webpage. First, create the bookmark with the `id` attribute, then link to it using `href="#id"`.'
        ]},
        { type: 'code', content: { language: 'html', code: `<h2 id="c4">Chapter 4</h2>
<a href="#c4">Jump to Chapter 4</a>` } },
    ]
  },
  {
    id: 'html-images',
    title: 'HTML Images',
    items: [
        { type: 'paragraph', content: 'Images can improve the design and the appearance of a web page. The `<img>` tag is used to embed an image and has two required attributes: `src` and `alt`.' },
        { type: 'paragraph', content: 'To add a background image on an HTML element, use the HTML `style` attribute and the CSS `background-image` property.' },
        { type: 'code', content: { language: 'html', code: `<p style="background-image: url('img_girl.jpg');">` } },
        { type: 'paragraph', content: 'If you want the background image to cover the entire element without stretching, set `background-size: cover;` and `background-attachment: fixed;`.' },
    ]
  },
  {
    id: 'html-tables',
    title: 'HTML Tables',
    items: [
        { type: 'paragraph', content: 'HTML tables allow web developers to arrange data into rows and columns.' },
        { type: 'table', content: [
            ['Tag', 'Description'],
            ['<table>', 'Defines a table'],
            ['<th>', 'Defines a header cell in a table'],
            ['<tr>', 'Defines a row in a table'],
            ['<td>', 'Defines a cell in a table'],
        ]},
        { type: 'paragraph', content: 'To avoid having double borders on tables, set the CSS `border-collapse` property to `collapse`.' },
        { type: 'code', content: { language: 'css', code: `table, th, td {
  border: 1px solid black;
}

table {
  border-collapse: collapse;
}` } },
    ]
  },
  {
    id: 'html-lists',
    title: 'HTML Lists',
    items: [
        { type: 'paragraph', content: '**Unordered HTML List**' },
        { type: 'paragraph', content: 'An unordered list starts with the `<ul>` tag. Each list item starts with the `<li>` tag. List items are marked with bullets by default.' },
        { type: 'code', content: { language: 'html', code: `<ul>
  <li>Coffee</li>
  <li>Tea</li>
</ul>` } },
        { type: 'paragraph', content: '**Ordered HTML List**' },
        { type: 'paragraph', content: 'An ordered list starts with the `<ol>` tag. Each list item starts with the `<li>` tag. List items are marked with numbers by default.' },
        { type: 'code', content: { language: 'html', code: `<ol>
  <li>Coffee</li>
  <li>Tea</li>
</ol>` } },
        { type: 'paragraph', content: '**HTML Description Lists**' },
        { type: 'paragraph', content: 'A list of terms, with a description of each term. The `<dl>` tag defines the list, `<dt>` defines the term, and `<dd>` describes each term.' },
        { type: 'code', content: { language: 'html', code: `<dl>
  <dt>Coffee</dt>
  <dd>- black hot drink</dd>
</dl>` } },
    ]
  },
  {
    id: 'html-forms',
    title: 'HTML Forms',
    items: [
        { type: 'paragraph', content: 'Forms are the principal mechanism to get user inputs on webpages. They are created using the `<form>` tag, and contain various input elements.' },
        { type: 'table', content: [
            ['Element', 'Description'],
            ['<input type="text">', 'Allows single-line text input.'],
            ['<textarea>', 'Allows multi-line text input.'],
            ['<input type="radio">', 'Lets users choose one option from a set.'],
            ['<input type="checkbox">', 'Lets users select one or multiple options.'],
            ['<input type="date">', 'Allows users to select a date from a calendar.'],
            ['<input type="submit">', 'A button that sends form data to the server.'],
            ['<select>', 'Creates a dropdown list.'],
        ]},
        { type: 'code', content: { language: 'html', code: `<form action="/submit-page">
  <label for="fname">First name:</label><br>
  <input type="text" id="fname" name="fname"><br>
  <input type="submit" value="Submit">
</form>` } },
    ]
  },
  {
    id: 'css-intro',
    title: 'Cascading Style Sheets (CSS)',
    items: [
      { type: 'paragraph', content: 'CSS describes how HTML elements are to be displayed on screen, paper, or in other media. It can control the layout of multiple web pages all at once. External stylesheets are stored in CSS files.' },
      { type: 'paragraph', content: 'CSS Syntax consists of a selector and a declaration block. The selector points to the HTML element, and the declaration block contains one or more `property: value;` pairs.' },
      { type: 'code', content: { language: 'css', code: `p { /* selector */
  color: red; /* declaration */
  text-align: center; /* declaration */
}` } },
    ]
  },
  {
    id: 'css-selectors',
    title: 'CSS Selectors',
    items: [
      { type: 'paragraph', content: 'Selectors are used to "find" (or select) the HTML elements you want to style.'},
      { type: 'list', content: [
        '**Element Selector:** Selects elements based on the element name (e.g., `p`).',
        '**ID Selector:** Uses the `id` attribute of an element. Preceded by a `#` (e.g., `#firstname`). An `id` must be unique per page.',
        '**Class Selector:** Uses the `class` attribute. Preceded by a `.` (e.g., `.intro`). Multiple elements can share the same class.'
      ]},
       { type: 'code', content: { language: 'html', code: `<p id="main-para" class="highlight">This is a special paragraph.</p>` } },
    ]
  },
  {
    id: 'css-add',
    title: 'How to Add CSS',
    items: [
      { type: 'paragraph', content: 'There are three ways to insert CSS:' },
      { type: 'list', content: [
          '**External CSS:** A `<link>` element in the `<head>` section links to an external `.css` file. This is the best method for styling many pages.',
          '**Internal CSS:** A `<style>` element in the `<head>` section contains the CSS code. Used for a single page with a unique style.',
          '**Inline CSS:** A `style` attribute is added directly to an HTML element. Used to apply a unique style for a single element.'
      ]}
    ]
  },
  {
    id: 'css-styling',
    title: 'CSS Styling Properties',
    items: [
        { type: 'paragraph', content: '**Backgrounds**: The `background-color` property specifies the background color, and `background-image` specifies an image to use.' },
        { type: 'paragraph', content: '**Opacity/Transparency**: The `opacity` property specifies the transparency of an element. It can take a value from 0.0 (fully transparent) to 1.0 (fully opaque).' },
        { type: 'paragraph', content: '**Borders**: The `border-style` property specifies what kind of border to display (e.g., `dotted`, `dashed`, `solid`).' },
        { type: 'paragraph', content: '**Margins**: Used to create space **around** elements, outside of any defined borders (`margin-top`, `margin-right`, etc.).' },
        { type: 'paragraph', content: '**Padding**: Used to generate space **around** an element\'s content, inside of any defined borders (`padding-top`, `padding-right`, etc.).' },
        { type: 'paragraph', content: '**Height and Width**: The `height` and `width` properties are used to set the height and width of an element.' },
    ]
  },
  {
    id: 'css-box-model',
    title: 'The CSS Box Model',
    items: [
        { type: 'paragraph', content: 'All HTML elements can be considered as boxes. In CSS, the term "box model" is used when talking about design and layout. It is a box that wraps around every HTML element and consists of: content, padding, border, and margin.' },
        { type: 'list', content: [
            '**Content:** The content of the box, where text and images appear.',
            '**Padding:** An area around the content, inside the border. The padding is transparent.',
            '**Border:** A border that goes around the padding and content.',
            '**Margin:** An area outside the border. The margin is transparent.'
        ]},
        { type: 'paragraph', content: 'An important concept is **`box-sizing`**. By default (`box-sizing: content-box`), the `width` and `height` properties apply **only** to the content area. The padding and border are added on top of that, making the element larger than specified.'},
        { type: 'paragraph', content: 'Many developers prefer `box-sizing: border-box;`, which includes padding and border in the element\'s total width and height. This makes layout calculations more intuitive.' },
        { type: 'code', content: { language: 'css', code: `/* This rule is often applied to all elements for predictable sizing */
* {
  box-sizing: border-box;
}` } }
    ]
  },
  {
    id: 'css-fonts-lists-tables',
    title: 'CSS for Text and Elements',
    items: [
        { type: 'paragraph', content: '**CSS Fonts**: The `font-family` property specifies the font for an element. There are five generic font families: Serif, Sans-serif, Monospace, Cursive, and Fantasy.' },
        { type: 'paragraph', content: '**CSS Lists**: The `list-style-type` property specifies the type of list item marker (e.g., `circle`, `square`, `upper-roman`).' },
        { type: 'paragraph', content: '**CSS Tables**: You can style tables with properties like `border`, `width`, `height`, `text-align` (horizontal alignment), and `vertical-align`.' },
        { type: 'code', content: { language: 'css', code: `table {
  width: 100%;
}
th {
  text-align: left;
}
td {
  vertical-align: bottom;
}` } }
    ]
  },
  {
    id: 'design-hosting',
    title: 'Website Design and Deployment',
    items: [
        { type: 'paragraph', content: '**Storyboard**: A visual representation of a creative project. For websites, it helps identify users and their expected interactions.' },
        { type: 'paragraph', content: '**Wireframe**: Outlines the structure and content of a website without including design elements like colors or images.' },
        { type: 'paragraph', content: '**Web Hosting**: Hosting a website means making it accessible to the public over the Internet by storing its files on a webserver. You rent space on a server from a hosting company.' },
        { type: 'paragraph', content: 'Simple free static web hosting sites:' },
        { type: 'list', content: [
            'GitHub Pages',
            'Netlify',
            'Vercel',
            'Firebase Hosting',
            'Render',
            'Cloudflare Pages'
        ] }
    ]
  }
];
