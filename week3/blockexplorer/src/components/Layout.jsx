import { useHistory } from 'react-router-dom';

const Layout = ({ children }) => {
    const navigate = useHistory();

    return (
        <div style={{ margin: 0, padding: 0 }}>
            <nav>
                <ul
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        listStyle: 'none',
                    }}>
                    <li
                        style={{
                            marginRight: '20px',
                            fontSize: '24px',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                        }}
                        onClick={() => {
                            navigate.push('/');
                            navigate.go('/');
                        }}>
                        Home
                    </li>
                    <li
                        onClick={() => {
                            navigate.push('/block');
                            navigate.go('/block');
                        }}
                        style={{ fontSize: '24px', fontWeight: 'bold', cursor: 'pointer' }}>
                        Block
                    </li>
                </ul>
            </nav>
            {children}
        </div>
    );
};

export default Layout;
