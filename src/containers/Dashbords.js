import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Chart } from 'react-google-charts'

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Switch from '@material-ui/core/Switch';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';

// Redux関連
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';

// スタイル
const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    margin: 10,
  },
  textLeft: {
    textAlign: 'left',
  },
  paragraph: {
    marginTop: 10,
    marginBottom: 10,
  },
});

const pieOptions = {
  title: "",
  pieHole: 0,
  slices: [
    {
      color: "#2196f3"
    },
    {
      color: "#f44336"
    },
    {
      color: "#4caf50"
    },
    {
      color: "#e9a227"
    }
  ],
  legend: {
    position: "bottom",
    alignment: "center",
    textStyle: {
      color: "233238",
      fontSize: 14
    }
  },
  tooltip: {
    showColorCode: true
  },
  chartArea: {
    left: 0,
    top: 0,
    width: "100%",
    height: "80%"
  },
  fontName: "Roboto"
};

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

class Dashbords extends React.Component {

  // Reduxを使うまでもないので状態はここで管理します
  state = {
    checked: [],
  };

  handleToggle = value => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked,
    });
  };
  
  
  // このSettingsがアップデートされた時にrender前に呼ばれる。state変更はNGなので注意。
  componentDidUpdate(prevProps, prevState) {
    // redux関連
    const { actions } = this.props;
    
    // もしNotificationがONになったら
    if (prevState.checked.indexOf('notification') === -1 && this.state.checked.indexOf('notification') !== -1) {
      actions.setNotification('info', 'Notification');
    }
  }

  render() {

    // Material-ui関連
    const { classes } = this.props;

    return (
      <div>
        <h2>総資産</h2>
        <h3>234,500,000 円</h3>
        <div className="App">
          <Chart
            chartType="PieChart"
            data={[["Age", "Weight"], ["NRI株", 420],　["アリババ株", 185], ["SONY株", 100]]}
            options={pieOptions}
            graph_id="PieChart"
            width={"100%"}
            height={"300px"}
            legend_toggle
          />
        </div>

        <div className={classes.root}>
          <List component="nav" aria-label="secondary mailbox folders">
            <ListItemLink href="https://www.nikkei.com/nkd/company/?scode=4307">
              <ListItemText primary="NRI  " />
              <ListItemText primary="2,385 JPY" />
              <ListItemText primary="420株" />
            </ListItemLink>

            <ListItemLink href="https://www.nikkei.com/nkd/company/?scode=4307">
              <ListItemText primary="ABB  " />
              <ListItemText primary="255 USD" />
              <ListItemText primary="185株" />
            </ListItemLink>

            <ListItemLink href="https://stocks.finance.yahoo.co.jp/stocks/detail/?code=6758.T">
              <ListItemText primary="SONY" />
              <ListItemText primary="7,936 JPY" />
              <ListItemText primary="100株" />
            </ListItemLink>
          </List>

        </div>
      </div>
    );
  }
}

// Material-ui関連
Dashbords.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};


// Material-uiのテーマ設定
export default withStyles(styles, { withTheme: true })(Dashbords);

