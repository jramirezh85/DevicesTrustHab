## How long did you spend on the coding test? What would you add to your solution if you had more time? If you didn't spend much time on the coding test then use this as an opportunity to explain what you would add.

In carrying out the test it took me approximately 8 hours. If I had more time I would have added:
In UI: add more styles, add animations when switching screens, unit tested.
In the API: add validations and error handling

## What was the most useful feature that was added to the latest version of your chosen language? Please include a snippet of code that shows how you've used it.

Some of the main characteristics of Angular 12 are:

The "View Engine", the old template rendering engine, is declared obsolete. In this version it is replaced by Ivy.
Add support for TypeScript 4.2. TypeScript <4.2.3 is no longer supported.
The Angular tooling now uses Webpack 5 to build applications
ng build now produces production bundle by default
Nullish Coalescing support

An example of how I used this last feature:
......
let location = (this.filterForm.get('location')?.value) ?? '';
let parentLocation = (this.filterForm.get ('parentLocation')?.value) ?? '';
......
in devices-list.component.ts.

## How would you track down a performance issue in production? Have you ever had to do this?

To tracking down performance problems is necessary: know when they exist and have sufficient context to figure out what was going wrong when they were slow. The best option is logging. The ideal is to have logging with optional logging levels that will spew out more detail which can be selectively turned on.

From my experience, I can talk about the use of Google Analytics for monitoring the Personal Banking System of Banco Guayaquil. With this tool we were able to verify which pages and processes were the most visited by users, average page loading time, average server connection time, average server response time, speed suggestions, among others.

## How would you improve the APIs that you just created?

In the API you would get the data from a database (for example MongoDB). I would structure the API in another way, adding Controllers and developing the business logic in them and Models to specify the characteristics of each field, I would add JWT to control requests, I would add validations and error handling.

## Please describe yourself using JSON.

{
	"name": "Javier Ramirez Hernandez",
	"occupation": "Software developer",
	"yearsExperience": 12,
	"education": "University of Computer Science",
	"skills": ["Proactive, responsible and organized", "Autonomy and decision making", "Management skills and teamwork", "Efficiency in communications with the Client", "Work under pressure"],
	"programmingLanguages": ["Angular", "Ionic", "ReactJs", "JavaScript", "Typescript", "Html", "CSS", "Node.js", "MongoDB", "SQL", "GraphQL"],
	"frameworksTools": ["Bootstrap", "Material Design", "JQuery", "Express.js", "Git", "Postman"],
	"projectManagement": ["Scrum"],
	"languages": ["English,Intermediate", "Spanish,Native"],
	"observations": "Proud of providing a better user experience and helping the work team",
	"perspectives": "I would like to learn new Frontend and Backend technologies and also deepen my knowledge of known technologies"
}