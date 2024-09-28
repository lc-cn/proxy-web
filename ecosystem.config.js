module.exports = {
	apps : [{
		name:"proxy-web",
		script: 'npm start',
		cwd:"/root/proxy-web",
		autorestart: true,
		env:{
			PORT:5220,
			DEPLOY_PATH:'/p'
		}
	}],
};
