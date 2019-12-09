import React from 'react';
import {View} from 'react-native';
import {withTheme} from 'react-native-elements';
import {AppText as Text} from '../../../components/common/AppText';
import {TestingSpinner} from './TestingSpinner';

export type ISensorStatus = 'pending' | 'pass' | 'fail' | 'errored';

export const BasicSensorTest = withTheme<{
  handleStatusChange: (x: any) => void;
  testSensor: () => Promise<boolean>;
  passText: string;
  failedText: string;
  pendingText: string;
  iconName: string;
  iconType: string;
}>(props => {
  const [sensorStatus, setSensorStatus] = React.useState<ISensorStatus>(
    'pending',
  );
  React.useEffect(() => {
    setTimeout(
      () =>
        props
          .testSensor()
          .then((status: boolean) => {
            if (status) setSensorStatus('pass');
            else setSensorStatus('fail');
          })
          .catch(() => setSensorStatus('errored')),
      2000,
    );
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    props.handleStatusChange(sensorStatus);
  }, [sensorStatus]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
        }}>
        <Text type="muted bold center">
          {
            {
              pending: props.pendingText,
              pass: props.passText,
              fail: props.failedText,
              errored: 'Testing Failed. You can skip the test for now',
            }[sensorStatus]
          }
        </Text>
      </View>
      <View style={{flex: 2}}>
        <TestingSpinner
          name={props.iconName}
          type={props.iconType}
          status={sensorStatus}
        />
      </View>
    </>
  );
});
