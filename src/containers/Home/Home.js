import React from "react";
import Greeting from "../greeting/Greeting";
import Skills from "../skills/Skills";
import StackProgress from "../skillProgress/skillProgress";
import WorkExperience from "../workExperience/WorkExperience";
import Projects from "../projects/Projects";
import StartupProject from "../StartupProjects/StartupProject";
import Achievement from "../achievement/Achievement";
import Blogs from "../blogs/Blogs";
import Talks from "../talks/Talks";
import Podcast from "../podcast/Podcast";
import Education from "../education/Education";
import Twitter from "../twitter-embed/twitter";

export default function Home() {
  return (
    <>
      <Greeting />
      <Skills />
      <StackProgress />
     <WorkExperience />
      <Education />
     
      <Projects />
      <StartupProject />
      <Achievement />
      <Blogs />
      <Talks />
      <Twitter />
      <Podcast />
    </>
  );
}
