import { getBee, injectStore, setBee, useBee } from '../../store/core';
import { centralEventbus } from '../../helpers/eventbus';

export interface Snapshot {
  id: string;
  timestamp: number;
  base64: string;
}

const snapshotToken = injectStore<Snapshot | null>('snapshot', null);
const snapshotsToken = injectStore<Array<Snapshot>>('snapshots', []);

centralEventbus.on('screenshot').subscribe(res => {
  setBee(snapshotToken, res.message);
});

export const useSnapshot = () => {
  return useBee(snapshotToken);
};

export const getSnapshot = () => {
  return getBee(snapshotToken);
};

export const setSnapshot = (value: Snapshot) => {
  return setBee(snapshotToken, value);
};

export const useSnapshotsHistory = () => {
  return useBee(snapshotsToken);
};

centralEventbus.on('history').subscribe(res => {
  const arr = res.message || [];
  arr.reverse();
  if (arr.length && !getSnapshot()) {
    setSnapshot(arr[0]);
  }
  setBee(snapshotsToken, arr.reverse());
});

centralEventbus.emit('get-history');
