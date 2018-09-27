import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import Checkbox from '@material-ui/core/Checkbox'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import NativeSelect from '@material-ui/core/NativeSelect'
import Switch from '@material-ui/core/Switch'
import moment from 'moment'


class AddressForm extends React.Component {
  state = {
    aborted: false
  }
  
  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  render() {
    console.log(moment(new Date).format("YYYY-M-DTHH:mm"))
    return (
      <React.Fragment>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <TextField
              required
              id="title"
              name="title"
              label="Title"
              autoComplete="title"
              fullWidth
              value={this.props.task.title}
              onChange={this.props.handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="description"
              name="description"
              label="Description"
              autoComplete="description"
              fullWidth
              value={this.props.task.description}
              onChange={this.props.handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="start"
              name="start"
              label="Start Date"
              type="datetime-local"
              autoComplete="start"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              value={moment(this.props.task.start).format("YYYY-MM-DDTHH:mm:ss")}
              // defaultValue="2018-09-18T10:37"
              // defaultValue={moment(new Date).format("YYYY-MM-DDTHH:mm:ss")}
              onChange={this.props.handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="end"
              name="end"
              label="Ending Date"
              type="datetime-local"
              fullWidth
              autoComplete="end"
              InputLabelProps={{
                shrink: true,
              }}
              value={moment(this.props.task.end).format("YYYY-MM-DDTHH:mm:ss")}
              onChange={this.props.handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl>
              <InputLabel htmlFor="progress-native-helper">Progress</InputLabel>
              <NativeSelect
                value={this.props.task.progress}
                onChange={this.props.handleChange}
                input={<Input name="progress" id="progress-native-helper" />}
              >
                <option value={10}>Not Start Yet</option>
                <option value={25}>Started</option>
                <option value={50}>Half Done</option>
                <option value={85}>Almost Completed</option>
                <option value={100}>Completed</option>
              </NativeSelect>
              <FormHelperText>On your best estimation</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControlLabel
              label="Aborted"
              control={
                <Switch
                  checked={this.state.checkedB}
                  onChange={this.handleChange('aborted')}
                  value="aborted"
                  color="primary"
                />
              }
            />
          </Grid>
        </Grid>
      </React.Fragment>
    )
  }
}

export default AddressForm;
