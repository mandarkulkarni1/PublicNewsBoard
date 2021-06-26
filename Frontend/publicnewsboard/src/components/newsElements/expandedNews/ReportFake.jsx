import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { fakeNewsSelector } from "../counterServices";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export default function ReportFake({data}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [category, setCategory] = React.useState("");
  console.log(data);

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

 const handleOk = () => {
    fakeNewsSelector({...data,category:category});
    setOpen(false);
};


  return (
    <div>
      <Button onClick={handleClickOpen}>Report News</Button>
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Select Category</DialogTitle>
        <DialogContent>
          <form className={classes.container}>
            <FormControl className={classes.formControl}>
              <Select
                labelId="demo-dialog-select-label"
                id="demo-dialog-select"
                value={category}
                onChange={handleChange}
                input={<Input />}
              >
                <MenuItem value={"fake"}>Fake</MenuItem>
                <MenuItem value={"explicit"}>Explicit</MenuItem>
                <MenuItem value={"halftruth"}>HalfTruth</MenuItem>
              </Select>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleOk} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
