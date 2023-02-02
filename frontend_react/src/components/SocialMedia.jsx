import React from 'react';
import {FiGithub} from 'react-icons/fi';
import {FaEtsy, FaLinkedinIn} from 'react-icons/fa';

const SocialMedia = () => {
  return (
    <div className="app__social">
        <div>
            <a href="https://github.com/kmlibin" target="_blank"><FiGithub /></a>
        </div>
        <div>
            <a href="https://linkedin.com/in/kelli-libin-b5ba78151/" target="_blank"><FaLinkedinIn /></a>
        </div>
        <div>
            <a href="https://www.etsy.com/shop/CreationsKMP" target="_blank"><FaEtsy /></a>
        </div>
    </div>
  )
}

export default SocialMedia