import React, { useState, useContext } from "react";
import { withStyles } from "@material-ui/core/styles";
import { GraphQLClient } from 'graphql-request';
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import AddAPhotoOutlinedIcon from '@material-ui/icons/AddAPhotoOutlined';
import LandscapeIcon from "@material-ui/icons/LandscapeOutlined";
import Context from '../../context';
import ClearIcon from "@material-ui/icons/Clear";
import SaveIcon from "@material-ui/icons/SaveTwoTone";
import axios from 'axios';
import {CREATE_PIN_MUTATION} from '../../graphql/mutations';
import {useClient} from '../../client';
import {unstable_useMediaQuery as useMediaQuery}  from '@material-ui/core/useMediaQuery'

const CreatePin = ({ classes }) => {

const mobileSize = useMediaQuery('(max-width: 650px')
 const client = useClient()
 const [title ,setTitle] = useState("");
 const [image, setImage] = useState(" ");
 const [content,setContent] = useState("");
 const [submitting, setSubmit] = useState(false);

 const {state,dispatch} = useContext(Context);



 const handleDeleteDraft = event => {


  setTitle(" ")
  setImage(" ")
  setContent(" ")
  dispatch({type:"DELETE_DRAFT"})
  setSubmit(false)
  
 }


 const handleImageUpload = async () => {

   const data = new FormData()


   // working with cloudinary api
   data.append("file",image)
   data.append("upload_preset",'geotreek')
   data.append("cloud_name","treek")

 const res = await axios.post(
     "https://api.cloudinary.com/v1_1/treek/image/upload",
     data
   )

   return res.data.url
 }

 const handleSubmit = async event => {
  try {
    event.preventDefault();
    setSubmit(true);
    const url = await handleImageUpload();
    const { latitude, longitude } = state.draft;
    const variables = { title, image: url, content, latitude, longitude };
    const {createPin} = await client.request(CREATE_PIN_MUTATION, variables);

  
    // console.log(createPin,"created");

    // dispatch({type:"CREATE_PIN",payload:createPin})
    handleDeleteDraft();
  } catch (err) {
    setSubmit(false);
    console.error("Error creating pin", err);
  }
};
  return (
    <form className={classes.form}>
    <Typography
      className={classes.alignCenter}
      component="h2"
      variant="h4"
      color="secondary"
    >
      <LandscapeIcon className={classes.iconLarge} />Location
    </Typography>
    <div>
      <TextField
        name="title"
        label="Title"
        placeholder="Insert pin title"
        onChange={e => setTitle(e.target.value)}
      />
      <input
        accept="image/*"
        id="image"
        type="file"
        className={classes.input}
        onChange={e => setImage(e.target.files[0])}
      />
      <label htmlFor="image">
        <Button
          style={{ color: image && "green" }}
          component="span"
          size="small"
          className={classes.button}
        >
          <AddAPhotoOutlinedIcon />
        </Button>
      </label>
    </div>
    <div className={classes.contentField}>
      <TextField
        name="content"
        label="Content"
        multiline
        rows={mobileSize ? "3" : "6"}
        margin="normal"
        fullWidth
        variant="outlined"
        onChange={e => setContent(e.target.value)}
      />
    </div>
    <div>
      <Button
        onClick={handleDeleteDraft}
        className={classes.button}
        variant="contained"
        color="primary"
      >
        <ClearIcon className={classes.leftIcon} />
        Discard
      </Button>
      <Button
        type="submit"
        className={classes.button}
        variant="contained"
        color="secondary"
        disabled={!title.trim() || !content.trim() || !image || submitting}
        onClick={handleSubmit}
      >
        Submit
        <SaveIcon className={classes.rightIcon} />
      </Button>
    </div>
  </form>
  );
};

const styles = theme => ({
  form: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    paddingBottom: theme.spacing.unit
  },
  contentField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: "95%"
  },
  input: {
    display: "none"
  },
  alignCenter: {
    display: "flex",
    alignItems: "center"
  },
  iconLarge: {
    fontSize: 40,
    marginRight: theme.spacing.unit
  },
  leftIcon: {
    fontSize: 20,
    marginRight: theme.spacing.unit
  },
  rightIcon: {
    fontSize: 20,
    marginLeft: theme.spacing.unit
  },
  button: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit,
    marginLeft: 0
  }
});

export default withStyles(styles)(CreatePin);