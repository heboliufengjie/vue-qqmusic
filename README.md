## Build Setup


# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```


http://mint-ui.github.io/docs/#/zh-cn2/field

1、login  

http://localhost:8080

2、register

http://localhost:8080/register

3、首页 有趣项目，有趣小伙伴列表

http://localhost:8080/lists

4、password_find（待续）

http://localhost:8080/password_find

5、创建项目（包含创建项目，一个用户所有标签）

http://localhost:8080/item_add

6、项目详情（项目详情、该项目关联标签，该项目成员）

http://localhost:8080/item_detail/16


7、个人资料展示
http://localhost:8080/personal_display

8、个人资料编辑页面

http://localhost:8080/me



lables_edit

http://localhost:8080/lables_edit

为项目添加标签
http://localhost:8080/lables_edit/14

______________________
https://www.babel.cc/share.do?s=1868326287299387

http://116.62.17.193/user/signin.do
http://116.62.17.193/user/signin.do
http://116.62.17.193/project/createProject.do



https://www.babel.cc/share.do?s=1868326287299387&/file/4795055242676073


——————————————————
	
	//添加项目
	LinkAddItem(){
		console.log('LinkAddItem')
		location.href='/item_add';
	},

	//个人展示

	LinkPersonalDisplay(){
		location.href='/personal_display';
	},

	//当前项目并未创立成功，而为该项目添加标签需要传项目id
	editProjectLabelsLink(){
		location.href="/lables_edit/"+this.$route.params.id;
	},


