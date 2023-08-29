import React from 'react'

function Information(props) {
  const {data}=props;

  //setting the names of variables we want to extract
  var difficulty = (data["difficulty"] === 0) ? 5 : data["difficulty"];
  var time_limit = (data["time_limit"] != null) ? data["time_limit"].seconds : 2;
  var memory_limit = ((data["memory_limit_bytes"] / 1000000) != null && data["memory_limit_bytes"] !== 0) ? (data["memory_limit_bytes"] / 1000000) : 16;
  var tags=(data["cf_tags"].length===0)?"N/A":data["cf_tags"];

  var tags2="";
  tags2+=tags[0];
  for(var i=1;i<tags.length;i++)
  {
    tags2=tags2+", ";
    tags2+=tags[i];
  }

  if(tags2==="N, /, A")
  {
    tags2="N/A";
  }

  // console.log(tags2);

  //setted the variables we wanted to extract

  return (
    <div>
        <b>INFORMATION</b>
        <ul style={{marginTop:'0px',listStyleType:'none',textAlign:'left',textDecoration:'underline',fontSize:'17px'}}>
          <li>Question ID : {data["row_idx"]}</li>
          <li>Time Limit : {time_limit}s</li>
          <li>Memory Limit : {memory_limit}MB</li>
          <li>Level : {difficulty}</li>
          <li>Tags : {tags2}</li>
        </ul>
    </div>
  )
}

export default Information