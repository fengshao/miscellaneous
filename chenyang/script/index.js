$(function () {
	let jsonData = {
		"nowDate": "2018-03-01",
		"result": [{
			"MANAGER_ID": "129771cde1904c6192da219b822b0624",
			"DEPARTMENT_ID": "2ce0028fad944ba5810da970e5b1601b",
			"ISSH": "1",
			"NAME": "泸州老窖",
			"END": "2018-03-20",
			"FILENAME": "15cdccbeb5c84476ba410056ff4dbb8d.png",
			"PATH": "20180301/15cdccbeb5c84476ba410056ff4dbb8d.png",
			"PHOTO_ID": "70fddf92832e40b899e3016a54ffeb87",
			"STATUS": "0",
			"BEGIN": "2018-03-08",
			"TYPE": "0",
			"SCREEN_NO": "21"
		}, {
			"MANAGER_ID": "129771cde1904c6192da219b822b0624",
			"DEPARTMENT_ID": "2ce0028fad944ba5810da970e5b1601b",
			"ISSH": "0",
			"NAME": "22",
			"END": "2018-03-29",
			"FILENAME": "0796e0a84e0e4865a09ab5eea34ae72d.png",
			"PATH": "20180302/0796e0a84e0e4865a09ab5eea34ae72d.png",
			"PHOTO_ID": "e2c4a51bb47648138da8a6fca18296fd",
			"STATUS": "0",
			"BEGIN": "2018-03-21",
			"TYPE": "0",
			"SCREEN_NO": "21"
		}, {
			"MANAGER_ID": "129771cde1904c6192da219b822b0624",
			"DEPARTMENT_ID": "2ce0028fad944ba5810da970e5b1601b",
			"ISSH": "0",
			"NAME": "22",
			"END": "2018-03-29",
			"FILENAME": "0796e0a84e0e4865a09ab5eea34ae72d.png",
			"PATH": "20180302/0796e0a84e0e4865a09ab5eea34ae72d.png",
			"PHOTO_ID": "e2c4a51bb47648138da8a6fca18296fd",
			"STATUS": "0",
			"BEGIN": "2018-03-21",
			"TYPE": "0",
			"SCREEN_NO": "45"
		}, {
			"MANAGER_ID": "129771cde1904c6192da219b822b0624",
			"DEPARTMENT_ID": "2ce0028fad944ba5810da970e5b1601b",
			"ISSH": "0",
			"NAME": "22",
			"END": "2018-03-29",
			"FILENAME": "0796e0a84e0e4865a09ab5eea34ae72d.png",
			"PATH": "20180302/0796e0a84e0e4865a09ab5eea34ae72d.png",
			"PHOTO_ID": "e2c4a51bb47648138da8a6fca18296fd",
			"STATUS": "0",
			"BEGIN": "2018-03-21",
			"TYPE": "0",
			"SCREEN_NO": "25"
		}, {
			"MANAGER_ID": "129771cde1904c6192da219b822b0624",
			"DEPARTMENT_ID": "2ce0028fad944ba5810da970e5b1601b",
			"ISSH": "1",
			"NAME": "22",
			"END": "2018-03-11",
			"FILENAME": "0796e0a84e0e4865a09ab5eea34ae72d.png",
			"PATH": "20180302/0796e0a84e0e4865a09ab5eea34ae72d.png",
			"PHOTO_ID": "e2c4a51bb47648138da8a6fca18296fd",
			"STATUS": "0",
			"BEGIN": "2018-03-1",
			"TYPE": "0",
			"SCREEN_NO": "25"
		}]
	};

	getData();

	// ajax 请求 获取 数据
	function getData() {
		//这里写ajax 请求 请求完毕 success 回调 createElement()  changeDivBgColor()方法
		let data = jsonData.result;
		createElement(jsonData.nowDate);
		changeDivBgColor(data)
	}

	//获取数据之后根据 后台传入的 服务器时间 创建 div
	function createElement(data) {
		let element = "";
		let pingNumElement = "";
		for (let i = 21; i <= 120; i++) {
			// element += "<div class='ping-content'id='ping_" + i + "'><div  class='ping-cls'>\" + i + \"</div><div class='day-content'>";
			element += "<div class='day-content' data-ping='ping_" + i + "' id='ping_" + i + "'>";
			pingNumElement += "<div class='ping-num-cls'data-ping='ping_" + i + "' id='ping_num" + i + "'>" + i + "</div>";

			for (let j = 0; j < 90; j++) {
				element += "<div class='day-cls no-ad' data-date='" + getDate(j, data) + "'> " + getDate(j, data) + "</div>";
			}
			element += "</div>";
		}
		$(".content").append(element);
		$(".bg-up-ping-num").append(pingNumElement);
	}

	//改变 已有广告位的日期背景颜色
	function changeDivBgColor(data) {
		for (let i = 0; i < data.length; i++) {
			let dateNum = GetDateDiff(data[i].BEGIN, data[i].END);
			for (let j = 0; j <= dateNum; j++) {
				let newDate = getDate(j, data[i].BEGIN);
				let element = $("#ping_" + data[i].SCREEN_NO + " div[data-date='" + newDate + "']");

				if (data[i].ISSH == 1) {
					let animationCls = ((j % 2 == 0) ? "bounce-up-cls" : "bounce-down-cls");
					element.removeClass("no-ad is-checked-ad no-checked-ad").addClass("is-checked-ad " + animationCls);
				} else if (data[i].ISSH == 0) {
					let animationCls = ((j % 2 == 0) ? "bounce-down-cls" : "bounce-up-cls");
					element.removeClass("no-ad is-checked-ad no-checked-ad").addClass("no-checked-ad " + animationCls);
				}
			}
		}
	}

	//获取当前时间 以后 的 第 N 天
	function getDate(n, time) {
		let date = new Date();
		if (time) {
			date = new Date(Date.parse(time.replace(/-/g, "/")))
		}
		//n代表天数,加号表示未来n天的此刻时间,减号表示过去n天的此刻时间
		let milliseconds = date.getTime() + 1000 * 60 * 60 * 24 * n;
		//getTime()方法返回Date对象的毫秒数,但是这个毫秒数不再是Date类型了,而是number类型,所以需要重新转换为Date对象,方便格式化
		let newDate = new Date(milliseconds);
		return newDate.getMonth() + 1 + "." + newDate.getDate();
	}


	function GetDateDiff(startDate, endDate) {
		let startTime = new Date(Date.parse(startDate.replace(/-/g, "/"))).getTime();
		let endTime = new Date(Date.parse(endDate.replace(/-/g, "/"))).getTime();
		let dates = Math.abs((startTime - endTime)) / (1000 * 60 * 60 * 24);
		return dates;
	}

	//监听 日期区域的滚动条 让 左侧 屏幕编号 及 顶部日期提示 一同滚动
	$(".content").scroll(function () {
		//变量t是滚动条滚动时，距离顶部的距离
		let t = $(".content").scrollTop();
		let left = $(".content").scrollLeft();
		$(".bg-up-ping-num").css("margin-top", -t);
		$(".time-line-content").css("transform", "translateX(" + (-left) + "px)");
	})

	//给屏幕编号 及  日期 添加鼠标事件 改变 背景颜色
	$(".day-content, .ping-num-cls").hover(function () {
		$(this).css("background-color", "#2e6da4");
		let pingNum = $(this).attr("data-ping");
		let element = $("div[data-ping='" + pingNum + "']");
		$(element).css("background-color", "#2e6da4");
	}, function () {
		$(this).css("background-color", "transparent");
		let pingNum = $(this).attr("data-ping");
		let element = $("div[data-ping='" + pingNum + "']");
		$(element).css("background-color", "transparent");
	});

	//点击屏幕编号 或 日期区域 获取 当前点击屏幕编号 然后 跳转到二级页面
	$(".day-content, .ping-num-cls").on("click", function () {
		let pingNum = $(this).attr("data-ping").split("_")[1];
		console.log("pingNum", pingNum);

	})

});
