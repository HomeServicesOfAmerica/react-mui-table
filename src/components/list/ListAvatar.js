import React from 'react';
import selectn from 'selectn';
import Avatar from 'material-ui/Avatar';
import FallbackIcon from 'material-ui/svg-icons/social/person';

const style = {
  display: 'inline-block',
  marginRight: '20px',
};

const ListAvatar = (props) => {
  const { item, avatar } = props;
  const src = selectn(avatar, item) || '';

  return (
    <Avatar
      style={style}
      src={src}
      icon={!src ? <FallbackIcon /> : null} />
  );
};

export default ListAvatar;
