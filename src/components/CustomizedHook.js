/* eslint-disable no-use-before-define */
import React from 'react';
import useAutocomplete from '@material-ui/lab/useAutocomplete';
import CloseIcon from '@material-ui/icons/Close';
import styled from 'styled-components';
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { getJson } from "../data/api";
import PropTypes from 'prop-types';



   
const Label = styled('label')`
  padding: 0 0 4px;
  line-height: 1.5;
  display: block;
  font-size: 16px;

`;

const InputWrapper = styled('div')`
  width: 480px;
  border: 1px solid #d9d9d9;
  background-color: #fff;
  border-radius: 4px;
  padding: 1px;
  display: flex;
  flex-wrap: wrap;

  &:hover {
    border-color: #343a40;
  }

  &.focused {
    border-color: #6f42c1;
    box-shadow: 0 0 0 0px rgba(24, 144, 255, 0.2);
    border: 2px solid #6f42c1;
  }

  & input {
    font-size: 16px;
    line-height: 28px;
    // padding: 2px 6px;
    padding: 2px 14px;
    flex-grow: 1;
    border: 0;
    outline: 0;
  }
`;

const Tag = styled(({ label, onDelete, ...props }) => (
  <div {...props}>
    <span>{label}</span>
    <CloseIcon fontSize="20" onClick={onDelete} />
  </div>
))`
  display: flex;
  align-items: center;
  height: 28px;
  margin: 2px;
  line-height: 22px;
  background-color: #fafafa;
  border: 1px solid #e8e8e8;
  border-radius: 2px;
  box-sizing: content-box;
  padding: 0 4px 0 10px;
  outline: 0;
  overflow: hidden;
  font-size: 16px;


  &:focus {
    border-color: #40a9ff;
    background-color: #e6f7ff;
  }

  & span {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  & svg {
    font-size: 20px;
    cursor: pointer;
    padding: 4px;
  }
`;

const Listbox = styled('ul')`
  width: 700px;
  margin: 0;
  margin-top: 2px;
  padding: 0;
  position: absolute;
  list-style: none;
  background-color: #fff;
  overflow: auto;
  max-height: 250px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 2;
  font-size: 16px;


  & li {
    padding: 5px 12px;
    display: flex;

    & span {
      flex-grow: 1;
    }

    & svg {
      color: transparent;
    }
  }

  & li[aria-selected='true'] {
    // background-color: #fafafa;
    // font-weight: 600;
    display:none;  

    // & svg {
    //   color: #1890ff;
    // }
  }

  & li[data-focus='true'] {
    // background-color: #e6f7ff;
    background-color:#e9e9e9;
    cursor: pointer;

    & svg {
      color: #000;
    }
  }
`;
const useStyles = makeStyles(theme => ({
    input: {
        borderRadius: 4,
      }
    }));


export default function CustomizedHook(props) {

  // const [glycanId1, setGlycanId1] = React.useState("");
  // const [typeResponse, setTypeResponse] = React.useState([""]);
  //const [value, setValue] = React.useState("");



   

  // const someAPI = searchText =>
  // new Promise(resolve => {
  //   setTimeout(() => {
  //     const teams = [
  //       { label: 'Boston Bruins', value: 'BOS' },
  //       { label: 'Buffalo Sabres', value: 'BUF' },
  //       { label: 'Detroit Red Wings', value: 'DET' },
  //     ];
      
  //     resolve(
  //       teams.filter(
  //         team =>
  //           searchText &&
  //           team.label
  //             .toLowerCase()
  //             .includes(searchText.toLowerCase())
  //       )
  //     );
  //   }, 1000);
  // });

   function glycanIdTypeahead2 (searchText)  {
    // const response = await fetch(`https://api.coinmarketcap.com/v1/ticker/?limit=10`);
    // const json = await response.json();
    //if (glycanId1.length > 0) {
      var glycanId2 = "a";  
    //alert(glycanId1);
    const url = `/typeahead?query={"field":"glytoucan_ac","value":"${glycanId2}","limit":100}`;
    const typeData = getJson(url).then(response =>  {alert(response.data) });
     //const typeData = getJson(url).data;
    alert(typeData);

     return typeData;
    //}
    //return [];
  }

  const handleChange = event => {
    alert(event.target.value);
  };

  function handleOnBlurCapture() {
    props.handleOrgSelect(value);
  }

  var typeResponse1 = [];
  var arr = [];
  const {
    getRootProps,
    getInputLabelProps,
    getInputProps,
    getTagProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
    value,
    focused,
    setAnchorEl,
  } = useAutocomplete({
    id: 'customized-hook',
    multiple: true,
    options: props.orgList,
    // searchText =>
    // new Promise(resolve => {
    //   setTimeout(() => {
    //     const teams = [
    //       { label: 'Boston Bruins', value: 'BOS' },
    //       { label: 'Buffalo Sabres', value: 'BUF' },
    //       { label: 'Detroit Red Wings', value: 'DET' },
    //     ];
        
    //     resolve(
    //       teams.filter(
    //         team =>
    //           searchText &&
    //           team.label
    //             .toLowerCase()
    //             .includes(searchText.toLowerCase())
    //       )
    //     );
    //   }, 1000);
    //}),
     getOptionLabel: option => option.name,
  });
  const classes = useStyles();




  // function glycanIdTypeahead1(event, y)  {
  //   const url = `/typeahead?query={"field":"glytoucan_ac","value":"${glycanId1}","limit":100}`;
  //   getJson(url).then(response =>  { typeResponse1 = response.data });
  // };

 


  return (
    <div>
    
      <div {...getRootProps()}>

        <InputWrapper ref={setAnchorEl} value = {props.org} className={focused ? 'focused' : ''}>
          {value.map((option, index) => (
            <Tag label={option.name} {...getTagProps({ index })} />
          )
          )}
          <input {...getInputProps()} placeholder="Click to select multiple Organisms" onBlurCapture={handleOnBlurCapture}/>
        </InputWrapper>
      </div>
      {groupedOptions.length > 0 ? (
        <Listbox {...getListboxProps()}>
        {groupedOptions.map((option, index) => (
            <li {...getOptionProps({ option, index })}>
              <span>{option.name}</span>
            </li>
          )
       )}
        </Listbox>
      ) : null}

    </div>
  );
}

CustomizedHook.propTypes = {
  value: PropTypes.array,
  orgList: PropTypes.array

};
