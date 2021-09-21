import React, { useState, useEffect} from "react";
import axios from "axios";
import './App.css';
import { Layout, Menu, Breadcrumb } from 'antd';

const { Header, Content, Footer } = Layout;

export default function App() {
  
  const [fileUrl, setFileUrl] = useState('');
  const [allFiles,setAllFiles] = useState([]);
  //const [file,setFile] = useState(null);

  //var files = [];

  const fileTypes = ['png', 'jpg', 'jpeg', 'bmp', 'gif', 'webp', 'svg', 'tiff', 'mp4', 'mov', 'webm', 'wmv', 'avi', 'avchd'];
  const imageTypes = ['png', 'jpg', 'jpeg', 'bmp', 'gif', 'webp', 'svg', 'tiff'];
  const videoTypes = ['mp4', 'mov', 'webm', 'wmv', 'avi', 'avchd'];

  const getFileType = (fileUrl) => {
    let partitions = fileUrl.split('.');
    return partitions[partitions.length - 1];
 }
  
  useEffect(() => {

    var files = [];
    var fileUrl = '';
    var promises = [];
    
    axios.get(`https://random.dog/woof.json`)
      .then(res => { 
        //setIsLoaded(true); 
        setFileUrl(res.data.url);
        
      }, (error) => {
        //setIsLoaded(true);
        //setError(error);
      });
        //console.log(fileUrl);
        //fileUrl = res.data.url;
        //console.log(fileUrl);
        //console.log(getFileType(fileUrl));
    
    /*
    promises.push(axios.get(`https://random.dog/woof.json`)
      .then(res => { 
        //setIsLoaded(true); 
        //setFileUrl(res.data.url);
        //console.log(fileUrl);
        fileUrl = res.data.url;
        console.log(fileUrl);
        console.log(getFileType(fileUrl));
        if (fileTypes.includes(getFileType(fileUrl))) {
          files.push(fileUrl);
          console.log(files);
        }
        
        
      }, (error) => {
          //setIsLoaded(true);
          //setError(error);
        }));
      
        Promise.all(files).then(() => {
          setAllFiles(allFiles);
       });
        
      */


      /*axios.get(fileUrl)
        .then(res => { 
          //setIsLoaded(true); 
          setFile(res.data);

          }, (error) => {
          //setIsLoaded(true);
          //setError(error);
          });;
        } */
        
        //console.log(fileUrl);
        /*
        if (fileTypes.includes(getFileType(fileUrl))) {
          files.push(fileUrl);
          //console.log(files);
        } */
        /*
        Promise.all(files).then(() => {
          setAllFiles(allFiles);
          //console.log(allFiles);
        });
        */
    
  }, [setAllFiles]);

  console.log(fileUrl);

  //console.log(allFiles);

  //{imageTypes.includes(getFileType(allFiles[0])) && <img src={allFiles[0]} ></img>}
        //{videoTypes.includes(getFileType(allFiles[0])) && <video src={allFiles[0]} ></video>}

  return (
    
    <Layout>
    <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
        <Menu.Item key="1">nav 1</Menu.Item>
        <Menu.Item key="2">nav 2</Menu.Item>
        <Menu.Item key="3">nav 3</Menu.Item>
      </Menu>
    </Header>
    <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>List</Breadcrumb.Item>
        <Breadcrumb.Item>App</Breadcrumb.Item>
      </Breadcrumb>
      <div className="site-layout-background" style={{ padding: 24, minHeight: 380, backgroundColor: 'white' }}>
          {imageTypes.includes(getFileType(fileUrl).toLowerCase()) && <img src={fileUrl} style={{height: 300, width: 400}} ></img>}
          {videoTypes.includes(getFileType(fileUrl).toLowerCase()) && 
          <video width="320" height="240" controls >
            <source src={fileUrl} />
            Your browser does not support the video tag.
          </video>} 

      </div>
    </Content>
    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
  </Layout>
    
  );
}

