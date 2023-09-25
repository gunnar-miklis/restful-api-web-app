# RESTful API – Full-Stack Web Application

Completed in less than 2 days.

## RESULT [>>LIVE DEMO<<](https://main--restful-api-web-app.netlify.app) 
<table>
	<tr>
		<td>
			<img src='./showcase/Screenshot 2023-08-30 015604.png'>
		</td>
		<td>
			<img src='./showcase/Screenshot 2023-08-29 222357.png'>
		</td>
		<td>
			<img src='./showcase/Screenshot 2023-08-29 222455.png'>
		</td>
		<td>
			<img src='./showcase/Screenshot 2023-08-29 222630.png'>
		</td>
		<td>
			<img src='./showcase/Screenshot 2023-08-29 222545.png'>
		</td>
	</tr>
</table>

---

<br/>

### I am looking for an entry-level-friendly junior position mentored by an experienced developer, so that I can strengthen my foundational skills in a real project context. And to gain a general experiences and a fundamental understanding.

<br/>

#### My Abilties (during 9-weeks web development boodcamp)
- Fundamentals in `HTML`, `CSS`, `JavaScript`, `MERN` _(MongoDB, Express, React, Node)_, `Git/GitHub`.
- Fundamental understanding of `CRUD`, `REST`, `OOP`, `DRY`, `KISS`, `YAGNI`.

#### My Abilties (after bootcamp, self-taught) 
- `TypeScript` in [one sinlge learning path](https://github.com/gunnar-miklis/learn-typescript).
- `ReactNative/Expo` for [rebuilding 2x simple components](https://github.com/gunnar-miklis/frontend-challenges/tree/main/qr-code-component/solutions/ReactNative) and [one frontend application](https://github.com/gunnar-miklis/qr-code-scanner-app#qr-code-ticket-scanner-in-react-native).
- `MUi` and `JSS` for [one learning series](https://github.com/gunnar-miklis/intro-to-material-ui-react) and [one simple component](https://github.com/gunnar-miklis/frontend-challenges/tree/main/tip-calculator/solutions/react-mui).
- Various [Coding Challenges](https://github.com/gunnar-miklis/coding-challenges) on Codewars.

&nbsp;

## SETUP
Using the MERN stack: MongoDB, Express, React, Node. And JavaScript as main language.

&nbsp;

### client
create frontend using [Vite](https://vitejs.dev/)
```bash
$ yarn create vite client
$ cd client
$ yarn 
```
install packages
```bash
$ yarn add react react-dom react-router-dom axios
```
setup eslint (options: JavaScript modules, browser, JS)
```bash
$ yarn add -D eslint eslint-config-google@latest eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-react-refresh
$ yarn run eslint --init
```
run client: http://localhost:5173
```bash
$ yarn dev
```

&nbsp;

### server
create backend using [ironlauncher](https://github.com/ironhack-edu/ironlauncher)
```bash
$ npx ironlauncher server
$ cd server
$ yarn
```
install packages
```bash
$ yarn add express mongoose dotenv
```
setup eslint (options: commonJS, node, JSON)
```bash
$ yarn add -D eslint eslint-config-google@latest
$ yarn run eslint --init
```
run server: http://localhost:5005
```bash
$ yarn dev
````

&nbsp;

### database

MongoDB database is running on port `27017`. The name is set to `todolist`.
```bash
$ mongodb://localhost:27017/todolist
```