import React, { useRef, useState } from "react";
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { View, Text, StyleSheet } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import uuid from "react-native-uuid";

const data = [
  {
    id: uuid.v4(),
    name: "Ariana Grande",
    picture:
      "https://imgix.bustle.com/uploads/getty/2020/11/14/d701578e-4e44-4a7c-aa4f-4ce719199e39-getty-1202219239.jpg?w=800&fit=crop&crop=focalpoint&auto=format%2Ccompress&fp-x=0.3302411873840445&fp-y=0.3314917127071823",
  },
  {
    id: uuid.v4(),
    name: "Billie Eilish",
    picture:
      "https://th.bing.com/th/id/OIP.Aq0jgWn091tkbeIlnNWkIAHaEK?rs=1&pid=ImgDetMain",
  },
  {
    id: uuid.v4(),
    name: "Drake",
    picture:
      "https://s.yimg.com/ny/api/res/1.2/FyXeLDYArJFx_jRfVZIKNw--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyMDA7aD05MDA-/https://media.zenfs.com/en/insider_articles_922/3cfb307db10dee35818faf40ebd4c8c6",
  },
  {
    id: uuid.v4(),
    name: "Justin Bieber",
    picture:
      "https://th.bing.com/th/id/R.f9d03078ff25653f854cb1a5d776a1aa?rik=G%2bsf7mhhjQm2sQ&riu=http%3a%2f%2fimages6.fanpop.com%2fimage%2fphotos%2f36900000%2fjustin-bieber-justin-bieber-36918699-1804-2500.jpg&ehk=%2b9NgpXJsV56rSyzufbThq4NIr5WZNFY8RfxkKvxK6ok%3d&risl=&pid=ImgRaw&r=0",
  },
  {
    id: uuid.v4(),
    name: "Kanye West",
    picture:
      "https://th.bing.com/th/id/OIP.6lSioztiBe1Dt_4uFDhtvAHaHa?rs=1&pid=ImgDetMain",
  },
  {
    id: uuid.v4(),
    name: "Lady Gaga",
    picture:
      "https://th.bing.com/th/id/R.0fc7b54ed9593a0c1915b802a52f78f8?rik=WNv9BoCenaFZ%2bQ&riu=http%3a%2f%2fmedia1.popsugar-assets.com%2ffiles%2f2016%2f01%2f10%2f138%2fn%2f1922398%2f49aaa839caa8207b_GettyImages-504396978.xxxlarge_2x.jpg&ehk=agNMoMN0X9qeqkxGBxix1q%2bye74YK%2bXxhGfXFfGsarM%3d&risl=&pid=ImgRaw&r=0",
  },
  {
    id: uuid.v4(),
    name: "Ariana Grande",
    picture:
      "https://imgix.bustle.com/uploads/getty/2020/11/14/d701578e-4e44-4a7c-aa4f-4ce719199e39-getty-1202219239.jpg?w=800&fit=crop&crop=focalpoint&auto=format%2Ccompress&fp-x=0.3302411873840445&fp-y=0.3314917127071823",
  },
  {
    id: uuid.v4(),
    name: "Billie Eilish",
    picture:
      "https://th.bing.com/th/id/OIP.Aq0jgWn091tkbeIlnNWkIAHaEK?rs=1&pid=ImgDetMain",
  },
  {
    id: uuid.v4(),
    name: "Drake",
    picture:
      "https://s.yimg.com/ny/api/res/1.2/FyXeLDYArJFx_jRfVZIKNw--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyMDA7aD05MDA-/https://media.zenfs.com/en/insider_articles_922/3cfb307db10dee35818faf40ebd4c8c6",
  },
  {
    id: uuid.v4(),
    name: "Justin Bieber",
    picture:
      "https://th.bing.com/th/id/R.f9d03078ff25653f854cb1a5d776a1aa?rik=G%2bsf7mhhjQm2sQ&riu=http%3a%2f%2fimages6.fanpop.com%2fimage%2fphotos%2f36900000%2fjustin-bieber-justin-bieber-36918699-1804-2500.jpg&ehk=%2b9NgpXJsV56rSyzufbThq4NIr5WZNFY8RfxkKvxK6ok%3d&risl=&pid=ImgRaw&r=0",
  },
  {
    id: uuid.v4(),
    name: "Kanye West",
    picture:
      "https://th.bing.com/th/id/OIP.6lSioztiBe1Dt_4uFDhtvAHaHa?rs=1&pid=ImgDetMain",
  },
  {
    id: uuid.v4(),
    name: "Lady Gaga",
    picture:
      "https://th.bing.com/th/id/R.0fc7b54ed9593a0c1915b802a52f78f8?rik=WNv9BoCenaFZ%2bQ&riu=http%3a%2f%2fmedia1.popsugar-assets.com%2ffiles%2f2016%2f01%2f10%2f138%2fn%2f1922398%2f49aaa839caa8207b_GettyImages-504396978.xxxlarge_2x.jpg&ehk=agNMoMN0X9qeqkxGBxix1q%2bye74YK%2bXxhGfXFfGsarM%3d&risl=&pid=ImgRaw&r=0",
  },
  {
    id: uuid.v4(),
    name: "Justin Bieber",
    picture:
      "https://th.bing.com/th/id/R.f9d03078ff25653f854cb1a5d776a1aa?rik=G%2bsf7mhhjQm2sQ&riu=http%3a%2f%2fimages6.fanpop.com%2fimage%2fphotos%2f36900000%2fjustin-bieber-justin-bieber-36918699-1804-2500.jpg&ehk=%2b9NgpXJsV56rSyzufbThq4NIr5WZNFY8RfxkKvxK6ok%3d&risl=&pid=ImgRaw&r=0",
  },
  {
    id: uuid.v4(),
    name: "Kanye West",
    picture:
      "https://th.bing.com/th/id/OIP.6lSioztiBe1Dt_4uFDhtvAHaHa?rs=1&pid=ImgDetMain",
  },
  {
    id: uuid.v4(),
    name: "Lady Gaga",
    picture:
      "https://th.bing.com/th/id/R.0fc7b54ed9593a0c1915b802a52f78f8?rik=WNv9BoCenaFZ%2bQ&riu=http%3a%2f%2fmedia1.popsugar-assets.com%2ffiles%2f2016%2f01%2f10%2f138%2fn%2f1922398%2f49aaa839caa8207b_GettyImages-504396978.xxxlarge_2x.jpg&ehk=agNMoMN0X9qeqkxGBxix1q%2bye74YK%2bXxhGfXFfGsarM%3d&risl=&pid=ImgRaw&r=0",
  },
  {
    id: uuid.v4(),
    name: "Ariana Grande",
    picture:
      "https://imgix.bustle.com/uploads/getty/2020/11/14/d701578e-4e44-4a7c-aa4f-4ce719199e39-getty-1202219239.jpg?w=800&fit=crop&crop=focalpoint&auto=format%2Ccompress&fp-x=0.3302411873840445&fp-y=0.3314917127071823",
  },
  {
    id: uuid.v4(),
    name: "Billie Eilish",
    picture:
      "https://th.bing.com/th/id/OIP.Aq0jgWn091tkbeIlnNWkIAHaEK?rs=1&pid=ImgDetMain",
  },
  {
    id: uuid.v4(),
    name: "Drake",
    picture:
      "https://s.yimg.com/ny/api/res/1.2/FyXeLDYArJFx_jRfVZIKNw--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyMDA7aD05MDA-/https://media.zenfs.com/en/insider_articles_922/3cfb307db10dee35818faf40ebd4c8c6",
  },
  {
    id: uuid.v4(),
    name: "Justin Bieber",
    picture:
      "https://th.bing.com/th/id/R.f9d03078ff25653f854cb1a5d776a1aa?rik=G%2bsf7mhhjQm2sQ&riu=http%3a%2f%2fimages6.fanpop.com%2fimage%2fphotos%2f36900000%2fjustin-bieber-justin-bieber-36918699-1804-2500.jpg&ehk=%2b9NgpXJsV56rSyzufbThq4NIr5WZNFY8RfxkKvxK6ok%3d&risl=&pid=ImgRaw&r=0",
  },
  {
    id: uuid.v4(),
    name: "Kanye West",
    picture:
      "https://th.bing.com/th/id/OIP.6lSioztiBe1Dt_4uFDhtvAHaHa?rs=1&pid=ImgDetMain",
  },
  {
    id: uuid.v4(),
    name: "Lady Gaga",
    picture:
      "https://th.bing.com/th/id/R.0fc7b54ed9593a0c1915b802a52f78f8?rik=WNv9BoCenaFZ%2bQ&riu=http%3a%2f%2fmedia1.popsugar-assets.com%2ffiles%2f2016%2f01%2f10%2f138%2fn%2f1922398%2f49aaa839caa8207b_GettyImages-504396978.xxxlarge_2x.jpg&ehk=agNMoMN0X9qeqkxGBxix1q%2bye74YK%2bXxhGfXFfGsarM%3d&risl=&pid=ImgRaw&r=0",
  },
  {
    id: uuid.v4(),
    name: "Ariana Grande",
    picture:
      "https://imgix.bustle.com/uploads/getty/2020/11/14/d701578e-4e44-4a7c-aa4f-4ce719199e39-getty-1202219239.jpg?w=800&fit=crop&crop=focalpoint&auto=format%2Ccompress&fp-x=0.3302411873840445&fp-y=0.3314917127071823",
  },
  {
    id: uuid.v4(),
    name: "Billie Eilish",
    picture:
      "https://th.bing.com/th/id/OIP.Aq0jgWn091tkbeIlnNWkIAHaEK?rs=1&pid=ImgDetMain",
  },
  {
    id: uuid.v4(),
    name: "Drake",
    picture:
      "https://s.yimg.com/ny/api/res/1.2/FyXeLDYArJFx_jRfVZIKNw--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyMDA7aD05MDA-/https://media.zenfs.com/en/insider_articles_922/3cfb307db10dee35818faf40ebd4c8c6",
  },
  {
    id: uuid.v4(),
    name: "Justin Bieber",
    picture:
      "https://th.bing.com/th/id/R.f9d03078ff25653f854cb1a5d776a1aa?rik=G%2bsf7mhhjQm2sQ&riu=http%3a%2f%2fimages6.fanpop.com%2fimage%2fphotos%2f36900000%2fjustin-bieber-justin-bieber-36918699-1804-2500.jpg&ehk=%2b9NgpXJsV56rSyzufbThq4NIr5WZNFY8RfxkKvxK6ok%3d&risl=&pid=ImgRaw&r=0",
  },
  {
    id: uuid.v4(),
    name: "Kanye West",
    picture:
      "https://th.bing.com/th/id/OIP.6lSioztiBe1Dt_4uFDhtvAHaHa?rs=1&pid=ImgDetMain",
  },
  {
    id: uuid.v4(),
    name: "Lady Gaga",
    picture:
      "https://th.bing.com/th/id/R.0fc7b54ed9593a0c1915b802a52f78f8?rik=WNv9BoCenaFZ%2bQ&riu=http%3a%2f%2fmedia1.popsugar-assets.com%2ffiles%2f2016%2f01%2f10%2f138%2fn%2f1922398%2f49aaa839caa8207b_GettyImages-504396978.xxxlarge_2x.jpg&ehk=agNMoMN0X9qeqkxGBxix1q%2bye74YK%2bXxhGfXFfGsarM%3d&risl=&pid=ImgRaw&r=0",
  },
  {
    id: uuid.v4(),
    name: "Justin Bieber",
    picture:
      "https://th.bing.com/th/id/R.f9d03078ff25653f854cb1a5d776a1aa?rik=G%2bsf7mhhjQm2sQ&riu=http%3a%2f%2fimages6.fanpop.com%2fimage%2fphotos%2f36900000%2fjustin-bieber-justin-bieber-36918699-1804-2500.jpg&ehk=%2b9NgpXJsV56rSyzufbThq4NIr5WZNFY8RfxkKvxK6ok%3d&risl=&pid=ImgRaw&r=0",
  },
  {
    id: uuid.v4(),
    name: "Kanye West",
    picture:
      "https://th.bing.com/th/id/OIP.6lSioztiBe1Dt_4uFDhtvAHaHa?rs=1&pid=ImgDetMain",
  },
  {
    id: uuid.v4(),
    name: "Lady Gaga",
    picture:
      "https://th.bing.com/th/id/R.0fc7b54ed9593a0c1915b802a52f78f8?rik=WNv9BoCenaFZ%2bQ&riu=http%3a%2f%2fmedia1.popsugar-assets.com%2ffiles%2f2016%2f01%2f10%2f138%2fn%2f1922398%2f49aaa839caa8207b_GettyImages-504396978.xxxlarge_2x.jpg&ehk=agNMoMN0X9qeqkxGBxix1q%2bye74YK%2bXxhGfXFfGsarM%3d&risl=&pid=ImgRaw&r=0",
  },
  {
    id: uuid.v4(),
    name: "Ariana Grande",
    picture:
      "https://imgix.bustle.com/uploads/getty/2020/11/14/d701578e-4e44-4a7c-aa4f-4ce719199e39-getty-1202219239.jpg?w=800&fit=crop&crop=focalpoint&auto=format%2Ccompress&fp-x=0.3302411873840445&fp-y=0.3314917127071823",
  },
  {
    id: uuid.v4(),
    name: "Billie Eilish",
    picture:
      "https://th.bing.com/th/id/OIP.Aq0jgWn091tkbeIlnNWkIAHaEK?rs=1&pid=ImgDetMain",
  },
  {
    id: uuid.v4(),
    name: "Drake",
    picture:
      "https://s.yimg.com/ny/api/res/1.2/FyXeLDYArJFx_jRfVZIKNw--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyMDA7aD05MDA-/https://media.zenfs.com/en/insider_articles_922/3cfb307db10dee35818faf40ebd4c8c6",
  },
  {
    id: uuid.v4(),
    name: "Justin Bieber",
    picture:
      "https://th.bing.com/th/id/R.f9d03078ff25653f854cb1a5d776a1aa?rik=G%2bsf7mhhjQm2sQ&riu=http%3a%2f%2fimages6.fanpop.com%2fimage%2fphotos%2f36900000%2fjustin-bieber-justin-bieber-36918699-1804-2500.jpg&ehk=%2b9NgpXJsV56rSyzufbThq4NIr5WZNFY8RfxkKvxK6ok%3d&risl=&pid=ImgRaw&r=0",
  },
  {
    id: uuid.v4(),
    name: "Kanye West",
    picture:
      "https://th.bing.com/th/id/OIP.6lSioztiBe1Dt_4uFDhtvAHaHa?rs=1&pid=ImgDetMain",
  },
  {
    id: uuid.v4(),
    name: "Lady Gaga",
    picture:
      "https://th.bing.com/th/id/R.0fc7b54ed9593a0c1915b802a52f78f8?rik=WNv9BoCenaFZ%2bQ&riu=http%3a%2f%2fmedia1.popsugar-assets.com%2ffiles%2f2016%2f01%2f10%2f138%2fn%2f1922398%2f49aaa839caa8207b_GettyImages-504396978.xxxlarge_2x.jpg&ehk=agNMoMN0X9qeqkxGBxix1q%2bye74YK%2bXxhGfXFfGsarM%3d&risl=&pid=ImgRaw&r=0",
  },
  {
    id: uuid.v4(),
    name: "Ariana Grande",
    picture:
      "https://imgix.bustle.com/uploads/getty/2020/11/14/d701578e-4e44-4a7c-aa4f-4ce719199e39-getty-1202219239.jpg?w=800&fit=crop&crop=focalpoint&auto=format%2Ccompress&fp-x=0.3302411873840445&fp-y=0.3314917127071823",
  },
  {
    id: uuid.v4(),
    name: "Billie Eilish",
    picture:
      "https://th.bing.com/th/id/OIP.Aq0jgWn091tkbeIlnNWkIAHaEK?rs=1&pid=ImgDetMain",
  },
  {
    id: uuid.v4(),
    name: "Drake",
    picture:
      "https://s.yimg.com/ny/api/res/1.2/FyXeLDYArJFx_jRfVZIKNw--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyMDA7aD05MDA-/https://media.zenfs.com/en/insider_articles_922/3cfb307db10dee35818faf40ebd4c8c6",
  },
  {
    id: uuid.v4(),
    name: "Justin Bieber",
    picture:
      "https://th.bing.com/th/id/R.f9d03078ff25653f854cb1a5d776a1aa?rik=G%2bsf7mhhjQm2sQ&riu=http%3a%2f%2fimages6.fanpop.com%2fimage%2fphotos%2f36900000%2fjustin-bieber-justin-bieber-36918699-1804-2500.jpg&ehk=%2b9NgpXJsV56rSyzufbThq4NIr5WZNFY8RfxkKvxK6ok%3d&risl=&pid=ImgRaw&r=0",
  },
  {
    id: uuid.v4(),
    name: "Kanye West",
    picture:
      "https://th.bing.com/th/id/OIP.6lSioztiBe1Dt_4uFDhtvAHaHa?rs=1&pid=ImgDetMain",
  },
  {
    id: uuid.v4(),
    name: "Lady Gaga",
    picture:
      "https://th.bing.com/th/id/R.0fc7b54ed9593a0c1915b802a52f78f8?rik=WNv9BoCenaFZ%2bQ&riu=http%3a%2f%2fmedia1.popsugar-assets.com%2ffiles%2f2016%2f01%2f10%2f138%2fn%2f1922398%2f49aaa839caa8207b_GettyImages-504396978.xxxlarge_2x.jpg&ehk=agNMoMN0X9qeqkxGBxix1q%2bye74YK%2bXxhGfXFfGsarM%3d&risl=&pid=ImgRaw&r=0",
  },
  {
    id: uuid.v4(),
    name: "Justin Bieber",
    picture:
      "https://th.bing.com/th/id/R.f9d03078ff25653f854cb1a5d776a1aa?rik=G%2bsf7mhhjQm2sQ&riu=http%3a%2f%2fimages6.fanpop.com%2fimage%2fphotos%2f36900000%2fjustin-bieber-justin-bieber-36918699-1804-2500.jpg&ehk=%2b9NgpXJsV56rSyzufbThq4NIr5WZNFY8RfxkKvxK6ok%3d&risl=&pid=ImgRaw&r=0",
  },
  {
    id: uuid.v4(),
    name: "Kanye West",
    picture:
      "https://th.bing.com/th/id/OIP.6lSioztiBe1Dt_4uFDhtvAHaHa?rs=1&pid=ImgDetMain",
  },
  {
    id: uuid.v4(),
    name: "Lady Gaga",
    picture:
      "https://th.bing.com/th/id/R.0fc7b54ed9593a0c1915b802a52f78f8?rik=WNv9BoCenaFZ%2bQ&riu=http%3a%2f%2fmedia1.popsugar-assets.com%2ffiles%2f2016%2f01%2f10%2f138%2fn%2f1922398%2f49aaa839caa8207b_GettyImages-504396978.xxxlarge_2x.jpg&ehk=agNMoMN0X9qeqkxGBxix1q%2bye74YK%2bXxhGfXFfGsarM%3d&risl=&pid=ImgRaw&r=0",
  },
  {
    id: uuid.v4(),
    name: "Ariana Grande",
    picture:
      "https://imgix.bustle.com/uploads/getty/2020/11/14/d701578e-4e44-4a7c-aa4f-4ce719199e39-getty-1202219239.jpg?w=800&fit=crop&crop=focalpoint&auto=format%2Ccompress&fp-x=0.3302411873840445&fp-y=0.3314917127071823",
  },
  {
    id: uuid.v4(),
    name: "Billie Eilish",
    picture:
      "https://th.bing.com/th/id/OIP.Aq0jgWn091tkbeIlnNWkIAHaEK?rs=1&pid=ImgDetMain",
  },
  {
    id: uuid.v4(),
    name: "Drake",
    picture:
      "https://s.yimg.com/ny/api/res/1.2/FyXeLDYArJFx_jRfVZIKNw--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyMDA7aD05MDA-/https://media.zenfs.com/en/insider_articles_922/3cfb307db10dee35818faf40ebd4c8c6",
  },
  {
    id: uuid.v4(),
    name: "Justin Bieber",
    picture:
      "https://th.bing.com/th/id/R.f9d03078ff25653f854cb1a5d776a1aa?rik=G%2bsf7mhhjQm2sQ&riu=http%3a%2f%2fimages6.fanpop.com%2fimage%2fphotos%2f36900000%2fjustin-bieber-justin-bieber-36918699-1804-2500.jpg&ehk=%2b9NgpXJsV56rSyzufbThq4NIr5WZNFY8RfxkKvxK6ok%3d&risl=&pid=ImgRaw&r=0",
  },
  {
    id: uuid.v4(),
    name: "Kanye West",
    picture:
      "https://th.bing.com/th/id/OIP.6lSioztiBe1Dt_4uFDhtvAHaHa?rs=1&pid=ImgDetMain",
  },
  {
    id: uuid.v4(),
    name: "Lady Gaga",
    picture:
      "https://th.bing.com/th/id/R.0fc7b54ed9593a0c1915b802a52f78f8?rik=WNv9BoCenaFZ%2bQ&riu=http%3a%2f%2fmedia1.popsugar-assets.com%2ffiles%2f2016%2f01%2f10%2f138%2fn%2f1922398%2f49aaa839caa8207b_GettyImages-504396978.xxxlarge_2x.jpg&ehk=agNMoMN0X9qeqkxGBxix1q%2bye74YK%2bXxhGfXFfGsarM%3d&risl=&pid=ImgRaw&r=0",
  },
  {
    id: uuid.v4(),
    name: "Ariana Grande",
    picture:
      "https://imgix.bustle.com/uploads/getty/2020/11/14/d701578e-4e44-4a7c-aa4f-4ce719199e39-getty-1202219239.jpg?w=800&fit=crop&crop=focalpoint&auto=format%2Ccompress&fp-x=0.3302411873840445&fp-y=0.3314917127071823",
  },
  {
    id: uuid.v4(),
    name: "Billie Eilish",
    picture:
      "https://th.bing.com/th/id/OIP.Aq0jgWn091tkbeIlnNWkIAHaEK?rs=1&pid=ImgDetMain",
  },
  {
    id: uuid.v4(),
    name: "Drake",
    picture:
      "https://s.yimg.com/ny/api/res/1.2/FyXeLDYArJFx_jRfVZIKNw--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyMDA7aD05MDA-/https://media.zenfs.com/en/insider_articles_922/3cfb307db10dee35818faf40ebd4c8c6",
  },
  {
    id: uuid.v4(),
    name: "Justin Bieber",
    picture:
      "https://th.bing.com/th/id/R.f9d03078ff25653f854cb1a5d776a1aa?rik=G%2bsf7mhhjQm2sQ&riu=http%3a%2f%2fimages6.fanpop.com%2fimage%2fphotos%2f36900000%2fjustin-bieber-justin-bieber-36918699-1804-2500.jpg&ehk=%2b9NgpXJsV56rSyzufbThq4NIr5WZNFY8RfxkKvxK6ok%3d&risl=&pid=ImgRaw&r=0",
  },
  {
    id: uuid.v4(),
    name: "Kanye West",
    picture:
      "https://th.bing.com/th/id/OIP.6lSioztiBe1Dt_4uFDhtvAHaHa?rs=1&pid=ImgDetMain",
  },
  {
    id: uuid.v4(),
    name: "Lady Gaga",
    picture:
      "https://th.bing.com/th/id/R.0fc7b54ed9593a0c1915b802a52f78f8?rik=WNv9BoCenaFZ%2bQ&riu=http%3a%2f%2fmedia1.popsugar-assets.com%2ffiles%2f2016%2f01%2f10%2f138%2fn%2f1922398%2f49aaa839caa8207b_GettyImages-504396978.xxxlarge_2x.jpg&ehk=agNMoMN0X9qeqkxGBxix1q%2bye74YK%2bXxhGfXFfGsarM%3d&risl=&pid=ImgRaw&r=0",
  },
  {
    id: uuid.v4(),
    name: "Justin Bieber",
    picture:
      "https://th.bing.com/th/id/R.f9d03078ff25653f854cb1a5d776a1aa?rik=G%2bsf7mhhjQm2sQ&riu=http%3a%2f%2fimages6.fanpop.com%2fimage%2fphotos%2f36900000%2fjustin-bieber-justin-bieber-36918699-1804-2500.jpg&ehk=%2b9NgpXJsV56rSyzufbThq4NIr5WZNFY8RfxkKvxK6ok%3d&risl=&pid=ImgRaw&r=0",
  },
  {
    id: uuid.v4(),
    name: "Kanye West",
    picture:
      "https://th.bing.com/th/id/OIP.6lSioztiBe1Dt_4uFDhtvAHaHa?rs=1&pid=ImgDetMain",
  },
  {
    id: uuid.v4(),
    name: "Lady Gaga",
    picture:
      "https://th.bing.com/th/id/R.0fc7b54ed9593a0c1915b802a52f78f8?rik=WNv9BoCenaFZ%2bQ&riu=http%3a%2f%2fmedia1.popsugar-assets.com%2ffiles%2f2016%2f01%2f10%2f138%2fn%2f1922398%2f49aaa839caa8207b_GettyImages-504396978.xxxlarge_2x.jpg&ehk=agNMoMN0X9qeqkxGBxix1q%2bye74YK%2bXxhGfXFfGsarM%3d&risl=&pid=ImgRaw&r=0",
  },
];

const ChooseArtistScreen = ({ navigation }) => {
  const [numColumns, setNumColumns] = useState(3); // Initial number of columns

  const renderItem = ({ item }) => {
    return (
      <View style={styles.artistContainer}>
        <TouchableOpacity>
          <Image source={{ uri: item.picture }} style={styles.artistImage} />
        </TouchableOpacity>
        <Text style={styles.artistName}>{item.name}</Text>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.searchBar}>
        <TouchableOpacity style={{ paddingHorizontal: 5 }}>
          <AntDesign name="search1" size={24} color="grey" />
        </TouchableOpacity>
        <TextInput placeholder="Search" style={styles.searchInput} />
      </View>
      <View style={{ flex: 2 }}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingTop: 60 }}
          numColumns={numColumns}
          key={numColumns}
        />
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: "#ccc",
          borderRadius: 30,
          padding: 5,
          width: "85%",
          alignItems: "center",
        }}
        onPress={() => navigation.navigate("MainFlow")}
      >
        <Text style={[styles.PrimaryLabel, { color: "#000" }]}>Next </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    justifyContent: "center",
    alignItems: "center",
    // For iOS
    shadowColor: "#fff", // Shadow color
    shadowOffset: { width: 0, height: 10 }, // Shadow position
    shadowOpacity: 0.8, // Shadow opacity
    shadowRadius: 20, // Shadow blur radius
    // For Android
    elevation: 1000, // Elevation for shadow effect
  },
  artistContainer: {
    alignItems: "center",
    padding: 10,
  },
  artistImage: {
    width: 100,
    height: 100,
    resizeMode: "cover",
    borderRadius: 50,
  },
  artistName: {
    color: "#fff",
    marginTop: 5,
    fontWeight: "bold",
  },
  searchBar: {
    marginVertical: "5%",
    width: "90%",
    height: 50,
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 6,
    alignItems: "center",
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
  },
  PrimaryLabel: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default ChooseArtistScreen;
