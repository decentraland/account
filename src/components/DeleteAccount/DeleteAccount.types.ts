export type Props = {
  onOpenDeleteAccountModal: () => void
  onGoToWallets: () => void
}

export type MapDispatchProps = Pick<Props, 'onOpenDeleteAccountModal'>
export type OwnProps = Pick<Props, 'onGoToWallets'>
