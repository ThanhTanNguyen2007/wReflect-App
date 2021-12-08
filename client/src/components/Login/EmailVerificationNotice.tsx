import React, { useState } from 'react';
import auth0 from 'auth0-js';
import { notification } from 'antd';

type EmailVerificationNoticeProps = {
  email: null | string;
  needsEmailVerification: null | boolean;
  webAuth: auth0.WebAuth;
};

function EmailVerificationNotice({ email, needsEmailVerification, webAuth }: EmailVerificationNoticeProps) {
  if (!email) {
    return null;
  }

  if (needsEmailVerification) {
    return (
      <>
        {notification.error({
          message: `Notification`,
          description: `${email}, please visit your email to complete email verification.`,
          placement: 'bottomLeft',
        })}
      </>
    );
  }

  return (
    <div className="emailVerificationNotice-scene">
      Welcome, {email}!
      {window.location.pathname.includes('workspace') ? (
        <>
          {' '}
          <a
            // style={{ cursor: 'pointer', color: '#007bff', fontWeight: 500 }}
            className="login__link"
            onClick={() => webAuth.authorize({ prompt: 'login' })}
          >
            Not you?
          </a>
        </>
      ) : (
        ''
      )}
    </div>
  );
}

export default EmailVerificationNotice;
