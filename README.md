# CloudParking
Location-based WeChat Mini Program（基于位置服务的微信小程序）

The following briefly introduces the development of each functional part:  
First, use the Eclipse integrated development environment to implement Socket communication based on the TCP protocol.   
The server first initializes the Socket, then binds the port to monitor, and waits for the client to connect;   
when the client successfully connects to the server, it can send data requests to the server.   
In this process, it is necessary to process the received original free parking space data and store the database for subsequent development and use;  
Then, develop a related Javaweb project, write the GPS latitude and longitude information of the free parking spaces in the MySQL data table into the data call in json format, and deploy it to the cloud server;  
Finally, the development of the function page of the WeChat applet is completed, and the functions of free parking space positioning and third-party map navigation are realized.  
The following is the demo part of the applet (some functions of the applet are currently online):  
First, search for Yunxiang Parking WeChat Mini Program and click to enter the homepage. Outdoor parking spaces and weather functions are currently open.   
Click the weather icon to jump to display the weather conditions in the area where the user is currently located; click on an outdoor parking space to enter the free parking space information acquisition interface.   
The red marker on the map shows the user's current location. Two test data labels, click the location label to display the label time, and then click the navigation icon to jump to the location information interface.   
At this time, you can use a third-party map for location navigation.  


下面是对各功能部分的开发简介：  
首先，使用Eclipse集成开发环境实现基于TCP协议的Socket通信。  
其中服务器端先初始化Socket，然后绑定端口并监听，等待客户端连接；  
当客户端成功连接服务器后，即可发送数据请求到服务器，在该过程中，需要对接收到的原始空闲车位数据处理并进行数据库存储，以便后续开发使用；  
然后，开发相关的Javaweb项目，将存储在MySQL数据表中空闲车位的GPS经纬度信息写成json格式的数据调用，并部署到云服务器上；  
最后，完成微信小程序功能页面的开发，实现空闲车位的位置定位以及第三方地图导航功能。  
以下是对小程序的演示部分（目前该小程序部分功能已经上线）：  
首先，搜索云享Parking微信小程序，点击进入到首页。目前已开放的有室外车位和天气功能。点击天气图标，跳转显示用户当前所在地区的天气情况；  
点击室外车位进入到空闲车位信息获取界面，地图上红色标注显示的为用户当前位置，当点击获取空闲车位信息时，地图上会显示已两个测试数据的标注，  
点击该位置标注会显示其标注时间，再点击导航图标则跳转到位置信息界面，  
此时可以使用第三方地图进行位置导航。  
 
