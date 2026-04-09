export type Props = {
  enablePartialSupportAlert?: boolean
  identity?: any
  address?: string
}

export type MapStateProps = Pick<Props, 'address'>
