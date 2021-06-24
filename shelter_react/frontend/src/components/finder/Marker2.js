// Marker.js
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
    position: absolute;
    width: 38px;
    height: 37px;
    background-image: url(http://localhost:3000/static/shelter.png);
    background-size: contain;
    background-repeat: no-repeat;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -webkit-transform: translate(-50%,-50%);
    -ms-transform: translate(-50%,-50%);
    transform: translate(-50%,-50%);
    // cursor: click;
`;

const Marker = ({ text, onClick,href }) => (
    <Wrapper
        href={href}
        alt={text}
        onClick={onClick}
    />
);

Marker.defaultProps = {
    onClick: null,
};

Marker.propTypes = {
    onClick: PropTypes.func,
    text: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired
};

export default Marker;