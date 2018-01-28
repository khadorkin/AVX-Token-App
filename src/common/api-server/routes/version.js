/*
Get lbry version information

Args:
    None
Returns:
    (dict) Dictionary of lbry version information
    {
        'build': (str) build type (e.g. "dev", "rc", "release"),
        'ip': (str) remote ip, if available,
        'lbrynet_version': (str) lbrynet_version,
        'lbryum_version': (str) lbryum_version,
        'lbryschema_version': (str) lbryschema_version,
        'os_release': (str) os release string
        'os_system': (str) os name
        'platform': (str) platform string
        'processor': (str) processor type,
        'python_version': (str) python version,
    }
*/

const version = {
  build: process.env.NODE_ENV,
  lbrynet_version: '0.18.2',
  lbryum_version: undefined,
  os_release: undefined,
  os_system: process.platform,
  platform: process.platform,
  processor: undefined,
  node_version: process.version,
};

export default () => version;
