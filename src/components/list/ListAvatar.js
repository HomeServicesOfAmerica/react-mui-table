import React from 'react';
import selectn from 'selectn';
import Avatar from 'material-ui/Avatar';
import FallbackIcon from 'material-ui/svg-icons/social/person';

const styles = {
  position: 'relative',
  marginLeft: 4,
  marginRight: 24,
};

const ListAvatar = ({ item, avatar }) => {
  const src = selectn(avatar, item) || '';
  const topStyle = src ? { top: 5 } : {};

  return (
    <Avatar
      style={{ ...styles, ...topStyle }}
      src={src}
      icon={!src ? <FallbackIcon /> : null} />
  );
};

export default ListAvatar;
