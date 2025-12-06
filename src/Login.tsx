import * as Types from './types'
import { useState } from 'react';

export function LoginForm({ onLogin }: Types.LoginFormProp) {
    const [input, setInput] = useState("");

    return (
        <div className="container">
            <div className="modal-box">
                <h2>Enter username</h2>

                <input
                    className="form-control"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />

                <button
                    className="btn btn-primary"
                    onClick={() => input.trim() && onLogin(input.trim())}
                >
                    Login
                </button>
            </div>
        </div>
    );
}
