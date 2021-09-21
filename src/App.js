import React, { useState, useEffect} from "react";
import axios from "axios";
import './App.css';
import { Layout, Menu, Breadcrumb, Button } from 'antd';

const { Header, Content, Footer } = Layout;

export default function App() {
  
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [fileUrl, setFileUrl] = useState('');
  const [allFiles,setAllFiles] = useState([]);
  //const [file,setFile] = useState(null);

  //var files = [];

  const fileTypes = ['png', 'jpg', 'jpeg', 'bmp', 'gif', 'webp', 'svg', 'tiff', 'mp4', 'mov', 'webm', 'wmv', 'avi', 'avchd'];
  const imageTypes = ['png', 'jpg', 'jpeg', 'bmp', 'gif', 'webp', 'svg', 'tiff'];
  const videoTypes = ['mp4', 'mov', 'webm', 'wmv', 'avi', 'avchd'];
  
  // initial number of files
  const INITIAL_NUM = 8;

  const getFileType = (fileUrl) => {
    let partitions = fileUrl.split('.');
    return partitions[partitions.length - 1].toLowerCase();
  }

  // fetch specified 'number' of files
  const fetchFiles = (promises, files, number) => {
    var fileUrl = '';
    for (let i=0; i<number;i++) {
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
        //console.log(files.length);
        
      }, (error) => {
          //setIsLoaded(true);
          setError(error);
        }));
      }
      Promise.all(promises).then(() => {
            setAllFiles(files);
            setIsLoaded(true);
          });
  }
  
  useEffect(() => {

    var files = [];
    
    var promises = [];
    
    /*
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
        */

    
    //console.log(files.length);

      fetchFiles(promises, files, INITIAL_NUM); 
    
          
  }, [setAllFiles]);

  console.log(allFiles);
  //var 
  useEffect(() => {
    if (isLoaded){
    var files = allFiles.slice(0);
    var len = files.length;
    console.log(len);
    var promises = [];
    if (len < INITIAL_NUM){
      fetchFiles(promises, files, INITIAL_NUM - len); 

    }
  }
  }
  );

  //console.log(fileUrl);

  //console.log(allFiles);

  
  if (error) {
    return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
      } else {
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
      <div class="card-columns-4">
        {allFiles.map(file => 
          <div class="card">
          { imageTypes.includes(getFileType(file)) && <img src={file} class="one-image mx-auto" ></img> }
          { videoTypes.includes(getFileType(file)) && 
          <video class="one-image mx-auto" controls >
            <source src={file} />
            Your browser does not support the video tag.
          </video> }
          </div>
        )}
        </div>
        <Button type="primary" shape="round" size="large" onClick={() => fetchFiles([], allFiles.slice(0), INITIAL_NUM)}>Load more</Button>
      </div>
    </Content>
    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
  </Layout>
    
  );
}
}
