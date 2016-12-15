import React from 'react';
import Avatar from 'material-ui/Avatar';
import FallbackIcon from 'material-ui/svg-icons/social/person';

const ListAvatar = props =>
  <Avatar
    src={props.avatar ? props.avatar : ''}
    icon={!props.avatar ? <FallbackIcon /> : ''} />;

export default ListAvatar;
