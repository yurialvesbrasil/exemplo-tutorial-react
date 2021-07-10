import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 100,
    marginRight: 10,
    backgroundColor: theme.palette.background.paper,
  },
}));

export function SelectedListItem(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <label form="list">Size</label>
      <List id="list" component="nav" aria-label="secondary mailbox folder">
        <ListItem
          button
          selected={props.selectedIndex === 0}
          onClick={(event) => props.handleListItemClick(event, 0)}
        >
          <ListItemText primary="3x3" />
        </ListItem>
        <ListItem
          button
          selected={props.selectedIndex === 1}
          onClick={(event) => props.handleListItemClick(event, 1)}
        >
          <ListItemText primary="4x4" />
        </ListItem>
      </List>
    </div>
  );
}