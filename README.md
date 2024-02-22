# web-crawler

### Description
This project is a web crawler designed to generate a report on website links. It crawls through a given website starting from a specified URL and collects information about the links found within the site. 

### Goals
The main goal of this project is to provide a tool that can systematically traverse a website, gather information about its internal and external links, and present this information in a structured format. This can be useful for various purposes such as website maintenance, SEO analysis, or content auditing.

### Requirements
To install and run this project, you need to have Node.js (18.7.0) installed on your machine. Additional dependencies that are required if you wish to run each part of this project are jest to use run any of the test cases. 

```npm install```   
```npm install jest --save-dev```

Optional Dependency
jsdom is only required if you wish to do further development otherwise it is completely optional and not needed to run the project.
```npm install jsdom```

### How to Run
After installing the dependencies, you can run the web crawler using the following command:
```npm start <url>```

Replace `<url>` with the starting URL from which you want to begin crawling.

### Learning Objectives
- Understand the basics of web crawling and web scraping.
- Gain familiarity with JavaScript libraries such as JSDOM for parsing HTML.
- Learn how to traverse and extract information from web pages programmatically.
- Practice handling different types of URLs and HTML elements.
- Gain experience in asynchronous programming using async/await and promises in JavaScript.
