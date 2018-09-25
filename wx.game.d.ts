type WXCommonCallback = (res?: any) => void;
type WXMergedAPI =
    //WXNetAPI & 
    WXMediaAPI &
    WXStorageAPI &
    //WXLocationAPI & 
    WXDeviceAPI &
    WXUIAPI &
    WXOpenAPI &
    WXUndocumentedAPI;

// 文档中没有的API
interface WXUndocumentedAPI {
    env: {
        USER_DATA_PATH: string,
    };
}

interface WXCommonObj {
    success?: WXCommonCallback;
    fail?: WXCommonCallback;
    complete?: WXCommonCallback;
}

interface WXEventTarget {
    id: string	//	事件源组件的id
    tagName: string	//	当前组件的类型
    dataset: any	//	事件源组件上由data-开头的自定义属性组成的集合
}

interface WXEventTouch {
    identifier: number	//	触摸点的标识符
    pageX: number
    pageY: number	//	距离文档左上角的距离，文档的左上角为原点 ，横向为X轴，纵向为Y轴
    clientX: number
    clientY: number	//	距离页面可显示区域（屏幕除去导航条）左上角距离，横向为X轴，纵向为Y轴	
}

interface WXEventCanvasTouch {
    identifier: number	//	触摸点的标识符	
    x: number
    y: number	//	距离 Canvas 左上角的距离，Canvas 的左上角为原点 ，横向为X轴，纵向为Y轴	
}

interface WXBaseEvent {
    type: string		//	事件类型
    timeStamp: number 	//	事件生成时的时间戳
    target: WXEventTarget			//	触发事件的组件的一些属性值集合
    currentTarget: WXEventTarget	//	当前组件的一些属性值集合	
}

interface WXCustomEvent extends WXBaseEvent {
    detail: any	// 额外的信息
}

interface WXTouchEvent extends WXBaseEvent {
    touches: Array<WXEventTouch | WXEventCanvasTouch>	//	触摸事件，当前停留在屏幕中的触摸点信息的数组
    changedTouches: Array<WXEventTouch | WXEventCanvasTouch>	//	触摸事件，当前变化的触摸点信息的数组	
}

// interface WXNetAPIRequestObj extends WXCommonObj {
// 	url: string;
// 	data?: Object | string;
// 	header?: Object;
// 	method?: string;
// }
// interface WXNetAPIDownloadFileObj {
// 	url: string;
// 	header?: Object;
// 	success?: (res: { tempFilePath: string, [propName: string]: any }) => void;
// 	fail?: WXCommonCallback;
// 	complete?: WXCommonCallback;
// }
// interface WXNetAPIUploadFileObj extends WXCommonObj {
// 	url: string;
// 	filePath: string;
// 	name: string;
// 	header?: Object;
// 	formData?: Object;
// }
// interface WXNetAPIConnectSocketObj extends WXCommonObj {
// 	url: string;
// 	data?: Object;
// 	header?: Object;
// 	method?: string;
// }
// interface WXNetAPI {
// 	request(obj: WXNetAPIRequestObj);
// 	downloadFile(obj: WXNetAPIDownloadFileObj);
// 	uploadFile(obj: WXNetAPIUploadFileObj);
// 	connectSocket(obj: WXNetAPIConnectSocketObj);
// 	onSocketOpen(cb: WXCommonCallback);
// 	onSocketError(cb: WXCommonCallback);
// 	sendSocketMessage(obj: { data: string | ArrayBuffer } & WXCommonObj);
// 	onSocketMessage(callback: (data: string | ArrayBuffer) => void);
// 	closeSocket();
// 	onSocketClose(cb: WXCommonCallback);
// }
// interface WXChooseImageObj {
// 	count?: number;
// 	sizeType?: string[];
// 	sourceType?: string[];
// 	success: (res: { tempFilePaths: string[], [propName: string]: any }) => void;
// 	fail: WXCommonCallback;
// 	complete: WXCommonCallback;
// }
// interface WXPreviewImageObj extends WXCommonObj {
// 	current?: string;
// 	urls: string[];
// }
// interface WXGetImageObj {
// 	src: string;
// 	success?: (res: { width: number, height: number, [propName: string]: any }) => void;
// 	fail?: WXCommonCallback;
// 	complete?: WXCommonCallback;
// }
// interface WXStartRecordObj {
// 	success?: (res: { tempFilePath: string, [propName: string]: any }) => void;
// 	fail?: WXCommonCallback;
// 	complete?: WXCommonCallback;
// }
// interface WXGetBackgroundAudioPlayerStateObj {
// 	success?: (res: { duration: number, currentPostion: number, status: number, downloadPercent: number, dataUrl: string, [propName: string]: any }) => void;
// 	fail?: WXCommonCallback;
// 	complete?: WXCommonCallback;
// }
interface WXSaveFileObj {
    tempFilePath: string,
    success?: (res: { savedFilePath: string }) => void;
    fail?: WXCommonCallback;
    complete?: WXCommonCallback;
}

interface WXFileItem {
    filePath: string,
    createTime: number,
    size: number,
}

interface WXGetSaveFileObj {
    success?: (res: {
        errMsg: string,
        fileList: WXFileItem[]
    }) => void;
    fail?: WXCommonCallback;
    complete?: WXCommonCallback;
}

// interface WXGetSaveFileInfoObj {
// 	filePath: string;
// 	success?: (res: { errMsg: string, createTime: number, size: number, [propName: string]: any }) => void;
// 	fail?: WXCommonCallback;
// 	complete?: WXCommonCallback;
// }
// interface WXRemoveSavedFileObj {
// 	filePath: string;
// 	success?: (res: { errMsg: string, fileList: { filePath: string, createTime: number, size: number, [propName: string]: any }[] }) => void;
// 	fail?: WXCommonCallback;
// 	complete?: WXCommonCallback;
// }
// interface WXChooseVideoObj extends WXCommonObj {
// 	sourceType?: string[];
// 	maxDuration?: number;
// 	camera?: string[];
// }
// interface WXVideo {
// 	tempFilePath: string;
// 	duration: number;
// 	size: number;
// 	height: number;
// 	width: number;
// }
// interface WXAudioContext {
// 	play();
// 	pause();
// 	seek(position: number);
// }
// interface WXVideoContext {
// 	play();
// 	pause();
// 	seek(position: number);
// 	sendDanmu(danmu: { text: string, color: string })
// }
type WXFileEncoding = "ascii" | "base64" | "binary" | "hex" | "ucs2" | "ucs-2" | "utf16le" | "utf-16le" | "utf-8" | "utf8" | "latin1";

interface WXFileSystemManager {

    access(obj: {
        filePath: string,
        success?: (res: { errMsg: string }) => void,
        fail?: WXCommonCallback,
        complete?: WXCommonCallback,
    }): void;

    // return errMsg
    accessSync(filePath: string): string;

    // 基础库 1.9.9 开始支持
    writeFile(res: {
        filePath: string,
        data: string | ArrayBuffer,
        encoding?: WXFileEncoding,
        success?: WXCommonCallback,
        fail?: WXCommonCallback,
        complete?: WXCommonCallback,
    })
    writeFileSync(filePath: string, data: string | ArrayBuffer, encoding?: WXFileEncoding)
    // 基础库 1.9.9 开始支持
    readFile(res: {
        filePath: string,
        encoding?: WXFileEncoding,
        success?: (res: { data: string | ArrayBuffer }) => void,
        fail?: (res: { errMsg: string }) => void,
        complete?: WXCommonCallback,
    })
    // filePath: 要读取的文件的路径
    // encoding: 指定读取文件的字符编码，如果不传 encoding， 则以 ArrayBuffer 格式读取文件的二进制内容
    // 基础库 1.9.9 开始支持
    readFileSync(filePath: string, encoding?: WXFileEncoding): string | ArrayBuffer
    // 基础库 1.9.9 开始支持
    getSavedFileList(res: {
        success?: (res: { errMsg: string, fileList: WXFileItem[] }) => void,
        fail?: WXCommonCallback,
        complete?: WXCommonCallback,
    })
}

interface WXMediaAPI {
    // 	chooseImage(obj: WXChooseImageObj);
    // 	previewImage(obj: WXPreviewImageObj);
    // 	getImageInfo(obj: WXGetImageObj);
    // 	startRecord(obj: WXStartRecordObj);
    // 	stopRecord();
    // 	playVoice(obj: { filePath: string } & WXCommonObj);
    // 	pauseVoice();
    // 	stopVoice();
    // 	getBackgroundAudioPlayerState(obj: WXGetBackgroundAudioPlayerStateObj);
    // 	playBackgroundAudio(obj: { dataUrl: string, title?: string, coverImgUrl?: string } & WXCommonObj);
    // 	pauseBackgroundAudio();
    // 	seekBackgroundAudio(obj: { position: number } & WXCommonObj);
    // 	stopBackgroundAudio();
    // 	onBackgroundAudioPlay(cb: WXCommonCallback);
    // 	onBackgroundAudioPause(cb: WXCommonCallback);
    // 	onBackgroundAudioStop(cb: WXCommonCallback);
    saveFile(obj: WXSaveFileObj);
    getSavedFileList(obj: WXGetSaveFileObj);

    // 基础库 1.9.9 开始支持
    getFileSystemManager(): WXFileSystemManager;
    // 	getSavedFileInfo(obj: WXGetSaveFileInfoObj);
    // 	removeSavedFile(obj: WXRemoveSavedFileObj);
    openDocument(obj: {
        filePath: string,
        // 最低版本 1.4.0
        fileType?: "doc" | "xls" | "ppt" | "pdf" | "docx" | "xlsx" | "pptx",
    } & WXCommonObj);

    // 	chooseVideo(obj: WXChooseVideoObj): WXVideo;
    // 	createAudioContext(audioId: string): WXAudioContext;
    // 	createVideoContext(vedioId: string): WXVideoContext;
}

interface WXGetStorageObj {
    key: string;
    success: (res: { data: any, [propName: string]: any }) => void;
    fail?: WXCommonCallback;
    complete?: WXCommonCallback;
}

interface WXGetStorageInfoObj {
    success: (res: { keys: string[], currentSize: number, limitSize: number, [propName: string]: any }) => void;
    fail?: WXCommonCallback;
    complete?: WXCommonCallback;
}

interface WXStorageAPI {
    setStorage(obj: { key: string, data: Object | string } & WXCommonObj);
    setStorageSync(key: string, data: Object | string);

    getStorage(obj: WXGetStorageObj);
    getStorageSync(key: string): any;

    getStorageInfo(obj: WXGetStorageInfoObj);
    getStorageInfoSync(): { keys: string[], currentSize: number, limitSize: number };

    removeStorage(obj: WXGetStorageObj);
    removeStorageSync(key: string);
    
    clearStorage();
    clearStorageSync();
}

// interface WXGetLocationObj {
// 	type: string;
// 	success: (res: { latitude: number, longitude: number, speed: number, accuracy: number, [propName: string]: any }) => void;
// 	cancel?: WXCommonCallback;
// 	fail?: WXCommonCallback;
// 	complete?: WXCommonCallback;
// }
// interface WXChooseLocationObj {
// 	success: (res: { latitude: number, longitude: number, name: string, address: string, [propName: string]: any }) => void;
// 	fail?: WXCommonCallback;
// 	complete?: WXCommonCallback;
// }
// interface WXOpenLocationObj extends WXCommonObj {
// 	latitude: number;
// 	longitude: number;
// 	scale?: number;
// 	name?: string;
// 	address?: string;
// }
// interface WXLocationAPI {
// 	getLocation(obj: WXGetLocationObj);
// 	chooseLocation(obj: WXGetLocationObj);
// 	openLocation(obj: WXOpenLocationObj);
// }
// interface WXSystemInfo {
// 	model: string;
// 	pixelRatio: number;
// 	windowWidth: number;
// 	windowHeight: number;
// 	language: string;
// 	version: string;
// 	[propName: string]: any
// }
interface WXDeviceAPI {
    // getSystemInfo(obj: { success: (res: WXSystemInfo) => void, fail?: WXCommonCallback, complete?: WXCommonCallback });
    // getSystemInfoSync(): WXSystemInfo;
    // 此接口从基础库 1.1.1 版本开始支持。
    canIUse(feature: string): boolean;

    // 	// getNetworkType(obj: { success: (res: { networkType: string, [propName: string]: any }) => void, fail?: WXCommonCallback, complete?: WXCommonCallback });
    // 	// onAccelerometerChange(cb: (res: { x: number, y: number, z: number, [propName: string]: any }) => void);
    // 	// onCompassChange(cb: (res: { direction: number, [propName: string]: any }) => void);
    // 	// makePhoneCall(obj: { phoneNumber: string } & WXCommonObj);
}

// interface WXToast extends WXCommonObj {
// 	title: string;
// 	icon?: string;
// 	duration?: number;
// }
// interface WXModal {
// 	title: string;
// 	content: string;
// 	showCancel?: boolean;
// 	cancelText?: string;
// 	cancelColor?: string;
// 	confirmText?: string;
// 	confirmColor?: string;
// 	success?: (res: { confirm: number, [propName: string]: any }) => void;
// 	fail?: WXCommonCallback;
// 	complete?: WXCommonCallback;
// }
// interface WXActionSheet {
// 	itemList: string[];
// 	itemColor?: string;
// 	success?: (res: { tabIndex: number, cancel: boolean, [propName: string]: any }) => void;
// 	fail?: WXCommonCallback;
// 	complete?: WXCommonCallback;
// }
// interface WXCreateAnimationObj {
// 	duration?: number;
// 	timingFunction?: string;
// 	delay?: number;
// 	transformOrigin?: string;
// }
// interface WXAnimation {
// 	opacity(value: number): WXAnimation;
// 	backgroundColor(color: string): WXAnimation;
// 	width(length: number): WXAnimation;
// 	height(length: number): WXAnimation;
// 	top(length: number): WXAnimation;
// 	left(length: number): WXAnimation;
// 	bottom(length: number): WXAnimation;
// 	right(length: number): WXAnimation;
// 	rotate(deg: number): WXAnimation;
// 	rotateX(deg: number): WXAnimation;
// 	rotateY(deg: number): WXAnimation;
// 	rotateZ(deg: number): WXAnimation;
// 	rotate3d(deg: number, x: number, y: number, z: number): WXAnimation;
// 	scale(sx: number, sy?: number): WXAnimation;
// 	scaleX(sx: number): WXAnimation;
// 	scaleY(sy: number): WXAnimation;
// 	scaleZ(sz: number): WXAnimation;
// 	scale3d(sx: number, sy: number, sz: number): WXAnimation;
// 	translate(tx: number, ty?: number): WXAnimation;
// 	translateX(tx: number): WXAnimation;
// 	translateY(ty: number): WXAnimation;
// 	translateZ(tz: number): WXAnimation;
// 	translate3d(tx: number, ty: number, tz: number): WXAnimation;
// 	skew(ax: number, ay?: number): WXAnimation;
// 	skewX(ax: number): WXAnimation;
// 	skewY(ay: number): WXAnimation;
// 	matrix(a: number, b: number, c: number, d: number, tx: number, ty: number): WXAnimation;
// 	matrix3d(a1: number, b1: number, c1: number, d1: number, a2: number, b2: number, c2: number, d2: number, a3: number, b3: number, c3: number, d3: number, a4: number, b4: number, c4: number, d4: number): WXAnimation;
// 	step();
// }
// interface WXContext {
// 	getActions(): any;
// 	clearActions();
// 	scale(scaleWidth: number, scaleHeight: number);
// 	rotate(degree: number);
// 	translate(x: number, y: number);
// 	save();
// 	restore();
// 	clearRect(x: number, y: number, width: number, height: number);
// 	fillText(x: number, y: number, text: string);
// 	drawImage(imageResource: string, x: number, y: number, width: number, height: number);
// 	fill();
// 	stroke();
// 	beginPath();
// 	closePath();
// 	moveTo(x: number, y: number);
// 	lineTo(x: number, y: number);
// 	rect(x: number, y: number, width: number, height: number);
// 	arc(x: number, y: number, radius: number, startAngle: number, sweepAngle: number);
// 	quadraticCurveTo(cpx: number, cpy: number, x: number, y: number);
// 	bezierCurveTo(cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number);
// 	setFillStyle(color: string);
// 	setStrokeStyle(color: string);
// 	setGlobalAlpha(alpha: number);
// 	setShadow(offsetX: number, offsetY: number, blur: number, color: string);
// 	setFontSize(fontSize: number);
// 	setLineWidth(lineWidth: number);
// 	setLineCap(lineCap: string);
// 	setLineJoin(lineJoin: string);
// 	setMiterLimit(miterLimit: number);
// }
interface WXUIAPI {
    // 	showToast(obj: WXToast);
    // 	hideToast();
    // 	showModal(obj: WXModal);
    // 	showActionSheet(obj: WXActionSheet);
    // 	setNavigationBarTitle(obj: { title: string } & WXCommonObj);
    // 	showNavigationBarLoading();
    // 	hideNavigationBarLoading();
    navigateTo(obj: { url: string } & WXCommonObj);
    // 	redirectTo(obj: { url: string } & WXCommonObj);
    // 	navigateBack(obj: { delta: number });
    // 	createAnimation(obj: WXCreateAnimationObj): WXAnimation;
    // 	createContext(): WXContext;
    // 	drawCanvas(obj: { canvasId: string, actions: any[], reserve?: boolean });
    // 	canvasToTempFilePath(obj: { canvasId: string });
    // 	hideKeyboard();
    // 	stopPullDownRefresh();
}

interface WXPayment extends WXCommonObj {
    // 时间戳从1970年1月1日00:00:00至今的秒数,即当前的时间
    timeStamp: number;
    // 随机字符串，长度为32个字符以下。
    nonceStr: string;
    // 统一下单接口返回的 prepay_id 参数值，提交格式如：prepay_id=***
    package: string;
    // 签名算法，暂支持 MD5
    signType: string;
    // 签名,具体签名方案参见小程序支付接口文档;
    paySign: string;
}

interface WXUserInfoObject {
    nickName: string;	// 	用户昵称
    avatarUrl: string	//	用户头像，最后一个数值代表正方形头像大小（有0、46、64、96、132数值可选，0代表132*132正方形头像），用户没有头像时该项为空。若用户更换头像，原有头像URL将失效。
    gender: string 		//	用户的性别，值为1时是男性，值为2时是女性，值为0时是未知
    city: string 		//	用户所在城市
    province: string	//	用户所在省份
    country: string		//	用户所在国家
    language: string	//	用户的语言，简体中文为zh_CN
}

type WXScopeValue = "scope.userInfo" | "scope.userLocation" | "scope.address" | "scope.invoiceTitle" | "scope.werun" | "scope.record" | "scope.writePhotosAlbum" | "scope.camera"

interface WXOpenAPI {
    login(obj: {
        timeout?: number,
        success?: (res: { errMsg: string, code: string }) => void,
        fail?: WXCommonCallback,
        complete?: WXCommonCallback
    });

    checkSession(obj: {
        success?: WXCommonCallback,
        fail?: WXCommonCallback,
        complete?: WXCommonCallback,
    });

	/*
		scope.userInfo	wx.getUserInfo	用户信息
		scope.userLocation	wx.getLocation, wx.chooseLocation, wx.openLocation	地理位置
		scope.address	wx.chooseAddress	通讯地址
		scope.invoiceTitle	wx.chooseInvoiceTitle	发票抬头
		scope.werun	wx.getWeRunData	微信运动步数
		scope.record	wx.startRecord	录音功能
		scope.writePhotosAlbum	wx.saveImageToPhotosAlbum, wx.saveVideoToPhotosAlbum	保存到相册
		scope.camera	<camera />	摄像头	  
	 */
    authorize(obj: {
        scope: WXScopeValue,	// 必填	需要获取权限的scope，详见 scope 列表
        success?: (errMsg: string) => void,	// 选填	接口调用成功的回调函数
        fail?: () => void,	// 选填	接口调用失败的回调函数
        complete?: () => void,	// 选填	接口调用结束的回调函数（调用成功、失败都会执行）		
    })

    getUserInfo(obj: {
		/*
		注：当 withCredentials 为 true 时，要求此前有调用过 wx.login 且登录态尚未过期，
		此时返回的数据会包含 encryptedData, iv 等敏感信息；当 withCredentials 为 false 时，
		不要求有登录态，返回的数据不包含 encryptedData, iv 等敏感信息。
		** 是否带上登录态信息	1.1.0
		 */
        withCredentials?: boolean,
        // 指定返回用户信息的语言，zh_CN 简体中文，zh_TW 繁体中文，en 英文。默认为en。	1.3.0
        lang?: string,
        // 超时时间，单位 ms	1.9.90
        timeout?: number,
        success?: (res: {
            userInfo: WXUserInfoObject,
            rawData: string,
            signature: string,
            encryptedData: string,
            iv: string,
            [propName: string]: any
        }) => void,
        fail?: () => void,
        complete?: () => void,
    });

    // 基础库 1.2.0 开始支持
    getSetting(obj: { success?: (res: { authSetting: { [propName: string]: boolean } }) => void, fail?: () => void, complete?: () => void })

    requestPayment(obj: WXPayment);
}

interface WXPageObj {
    data?: Object;
    onLoad?: Function;
    onReady?: Function;
    onShow?: Function;
    onHide?: Function;
    onUnload?: Function;
    onPullDownRefresh?: Function;
    onReachBottom?: Function;
    [propName: string]: any;
}

interface IPage {
    (obj: WXPageObj): void;
    setData(obj: Object);
    forceUpdate();
    update();
}

/*
以下场景支持返回 referrerInfo.appId：
场景值	场景	appId 信息含义
1020	公众号 profile 页相关小程序列表	来源公众号 appId
1035	公众号自定义菜单	来源公众号 appId
1036	App 分享消息卡片	来源应用 appId
1037	小程序打开小程序	来源小程序 appId
1038	从另一个小程序返回	来源小程序 appId
1043	公众号模板消息	来源公众号 appId
*/
interface WXAppLaunchReferrerInfo {
    appId: string	// 来源小程序或公众号或App的 appId，详见下方说明
    extraData: any	// 来源小程序传过来的数据，scene=1037或1038时支持	
}

interface WXAppLaunchObj {
    path: string	// 打开小程序的路径
    query: any		// 打开小程序的query
    scene: number	// 打开小程序的场景值
    shareTicket: string 	// shareTicket，详见 获取更多转发信息
    referrerInfo: any	 	// 当场景为由从另一个小程序或公众号或App打开时，返回此字段
}

interface WXAppObj {
    // 小程序初始化完成时触发，全局只触发一次。
    onLaunch?: (res: WXAppLaunchObj) => void;
    // 小程序启动，或从后台进入前台显示时触发。
    onShow?: (res: WXAppLaunchObj) => void;
    // 小程序从前台进入后台时触发。
    onHide?: Function;
    // 错误信息，包含堆栈
    onError?: (err: string) => void;
    // 小程序要打开的页面不存在时触发。
    onPageNotFound?: (res: {
        path: string,   // 不存在页面的路径
        query: any,  	// 打开不存在页面的 query
        isEntryPage: boolean,  // 是否本次启动的首个页面（例如从分享等入口进来，首个页面是开发者配置的分享页面）
    }) => void;
    [propName: string]: any;
}

interface IApp {
    (obj: WXAppObj): void;
    globalData: any;
}

interface WXGetAppObj {
    globalData: any;
    [propName: string]: any;
    // getUserInfo(cb: (userInfo: WXUserInfoObject) => void);
    getCurrentPage(): IPage;
}

declare let wx: WXMergedAPI;
declare let Page: IPage;
declare let App: IApp;
declare function getApp(): WXGetAppObj;
declare function getCurrentPages(): any[];

declare module "WXAPI" {
    export let wx: WXMergedAPI;
    export let Page: IPage;
    export function App(obj: WXAppObj);
    export function getApp(): WXGetAppObj;
    export function getCurrentPages(): any[];
}