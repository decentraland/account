export type Props = {
  address?: string
  onOpenDeleteAccountModal: (address: string) => void
  onGoToWallets: () => void
}

export type MapStateProps = Pick<Props, 'address'>
export type MapDispatchProps = Pick<Props, 'onOpenDeleteAccountModal'>
export type OwnProps = Pick<Props, 'onGoToWallets'>
