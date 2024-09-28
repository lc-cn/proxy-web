module.exports = {
	apps : [{
		name:"proxy-web",
		script: 'npm start',
		cwd:"/root/proxy-web",
		autorestart: true,
		env:{
			PORT:3000,
			DEPLOY_PATH:'/p'
		}
	}],
};
