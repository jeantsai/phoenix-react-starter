import React from 'react'
import PropTypes from 'prop-types'
import {withRouter} from 'found'
import withStyles from '@material-ui/core/styles/withStyles'
import Paper from '@material-ui/core/Paper'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import TaskForm from './TaskForm'
import CreateTaskMutation from '../mutations/CreateTaskMutation'
import { notify } from './Notifier'


const styles = theme => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(800 + theme.spacing.unit * 2 * 2)]: {
      width: 800,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up(800 + theme.spacing.unit * 3 * 2)]: {
      marginTop: theme.spacing.unit * 6,
      marginBottom: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 3,
    },
  },
  stepper: {
    padding: `${theme.spacing.unit * 3}px 0 ${theme.spacing.unit * 5}px`,
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit,
  },
});

const steps = ['Task Information']

class TaskEditor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeStep: 0,
      task: props['task'] || {
        title: 'New Task',
        description: '',
        start: new Date(),
        end: new Date(),
        aborted: false,
        progress: 0,
      },
    }
  }

  handleNext = () => {
    const { activeStep } = this.state;
    this.setState({
      activeStep: activeStep + 1,
    });
  };

  handleBack = () => {
    const { activeStep } = this.state;
    this.setState({
      activeStep: activeStep - 1,
    });
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };

  getStepContent = step => {
    switch (step) {
      case 0:
        return (
          <TaskForm 
            task={this.state.task} 
            handleChange={this.handleFormChange}
          />
        )
      default:
        throw new Error('Unknown step')
    }
  }

  handleFormChange = e => {
    // console.log(e)
    let value = e.target.value
    let name = e.target.name
    this.setState(
      prevState => {
        return { 
          task: {
            ...prevState.task,
            [name]: value
          }
        }
      }
      , () => {}
    )
  }

  handleFormSubmit = e => {
    e.preventDefault()
    CreateTaskMutation(
      this.state.task, () => {
        console.log("A new task has been created successfully.")
        // this.props.history.goBack()
        // this.props.router.replace('/')
      }, (err) => {
        // console.log("Encounter errors:", err)
        if (err.length !== 0) {
          const msg = err.reduce((acc, e) => acc ? acc + "\n" + e.message : e.message, '')
          console.log("Notifying...", msg)
          notify(msg, 'error')
        } else {
          notify('Got error while create a new task, but the error message is empty.')
        }
      }
    )
  }

  handleDeleteTask = id => {
    let confirm = confirm(`Are you sure to delete task {id}`);
    if (!confirm) {
      return
    }
    console.log(`Deleting task [{id}] ...`)
  }

  render() {
    const { classes } = this.props;
    const { activeStep } = this.state;

    return (
      <main className={classes.layout}>
        <form onSubmit={this.handleFormSubmit}>
          <Paper className={classes.paper}>
            <Typography variant="display1" align="center">
              Task
            </Typography>
            {steps.length === 1 ? (<div />) : (
              <Stepper activeStep={activeStep} className={classes.stepper}>
                {steps.map(label => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            )}
            <React.Fragment>
              {activeStep === steps.length ? (
                <React.Fragment>
                  <Typography variant="headline" gutterBottom>
                    Thank you for your order.
                  </Typography>
                  <Typography variant="subheading">
                    Your order number is #2001539. We have emailed your order confirmation, and will
                    send you an update when your order has shipped.
                  </Typography>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {steps.length === 1 ? (
                    <Typography variant="title" gutterBottom>
                      &nbsp;
                    </Typography>
                  ) : (
                    <Typography variant="title" gutterBottom>
                      {steps[activeStep].label}
                    </Typography>
                  )}
                  {this.getStepContent(activeStep)}
                  <div className={classes.buttons}>
                    {activeStep !== 0 && (
                      <Button onClick={this.handleBack} className={classes.button}>
                        Back
                      </Button>
                    )}
                    {activeStep === steps.length - 1 ? (
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.button}
                      >
                        Save
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={this.handleNext}
                        className={classes.button}
                      >
                        Next
                      </Button>
                    )}
                  </div>
                </React.Fragment>
              )}
            </React.Fragment>
          </Paper>
        </form>
      </main>
    )
  }
}

TaskEditor.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withRouter(withStyles(styles)(TaskEditor))
