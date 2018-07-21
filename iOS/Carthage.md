## carthage update で simulator のなにかが原因でエラー
Carthageで入れたいライブラリとXcodeのシミュレーターのID?が違う？

全部消してもう一度やればOK
PCを再起動しなくてもいけた。Xcodeは再起動したほうがいいかも。

```sh
$ rm -rf ~/Library/Developer/CoreSimulator/Devices/*
$ carthage update --platform iOS
```


### output
error

```
Build Failed
	Task failed with exit code 70:
	/usr/bin/xcrun xcodebuild -workspace /Users/akito/src/iOS/QiitaViewer/Carthage/Checkouts/Alamofire/Alamofire.xcworkspace -scheme Alamofire\ iOS -configuration Release -derivedDataPath /Users/akito/Library/Caches/org.carthage.CarthageKit/DerivedData/9.4.1_9F2000/Alamofire/4.7.3 -sdk iphonesimulator -destination platform=iOS\ Simulator,id=9E22C169-996D-41EB-B2EC-C3CFBE98966B -destination-timeout 3 ONLY_ACTIVE_ARCH=NO CODE_SIGNING_REQUIRED=NO CODE_SIGN_IDENTITY= CARTHAGE=YES build (launched in /Users/akito/src/iOS/QiitaViewer/Carthage/Checkouts/Alamofire)

This usually indicates that project itself failed to compile. Please check the xcodebuild log for more details: /var/folders/vl/h60blwms4cv3g4f8v74fvcsc0000gn/T/carthage-xcodebuild.AYQcQq.log
```


`/var/folders/vl/h60blwms4cv3g4f8v74fvcsc0000gn/T/carthage-xcodebuild.AYQcQq.log` の内容

```
/usr/bin/xcrun xcodebuild -workspace /Users/akito/src/iOS/QiitaViewer/Carthage/Checkouts/Alamofire/Alamofire.xcworkspace -scheme Alamofire\ iOS -configuration Release -derivedDataPath /Users/akito/Library/Caches/org.carthage.CarthageKit/DerivedData/9.4.1_9F2000/Alamofire/4.7.3 -sdk iphonesimulator -destination platform=iOS\ Simulator,id=9E22C169-996D-41EB-B2EC-C3CFBE98966B -destination-timeout 3 ONLY_ACTIVE_ARCH=NO CODE_SIGNING_REQUIRED=NO CODE_SIGN_IDENTITY= CARTHAGE=YES build (launched in /Users/akito/src/iOS/QiitaViewer/Carthage/Checkouts/Alamofire)User defaults from command line:
    IDEDerivedDataPathOverride = /Users/akito/Library/Caches/org.carthage.CarthageKit/DerivedData/9.4.1_9F2000/Alamofire/4.7.3

Build settings from command line:
    CARTHAGE = YES
    CODE_SIGN_IDENTITY =
    CODE_SIGNING_REQUIRED = NO
    ONLY_ACTIVE_ARCH = NO
    SDKROOT = iphonesimulator11.4

xcodebuild: error: Unable to find a destination matching the provided destination specifier:
                { platform:iOS Simulator, id:9E22C169-996D-41EB-B2EC-C3CFBE98966B }

        Available destinations for the "Alamofire iOS" scheme:
                { platform:iOS Simulator, id:51D9E38E-0CA2-44B4-8919-A75FA3787AB4, OS:11.4, name:iPhone 6s }
                { platform:iOS Simulator, id:9CA1E98F-B259-4862-B48A-10DEAB743FB1, OS:11.4, name:iPhone 7 }
                { platform:iOS Simulator, id:B9608C2F-A631-48A1-8059-6BDEC7F7BD82, OS:11.4, name:iPhone 7 Plus }
                { platform:iOS Simulator, id:6AF967E7-46C1-42DC-B85B-0130065A1AD3, OS:11.4, name:iPhone 8 }
                { platform:iOS Simulator, id:2D140CAB-9C6C-4750-AFFF-FF2FA13133AE, OS:11.4, name:iPhone 8 Plus }
                { platform:iOS Simulator, id:F251CF0B-9D51-4764-A35F-8A69655C5961, OS:11.4, name:iPhone SE }
                { platform:iOS Simulator, id:4FC3B788-63EF-4FC9-9508-62CAB8F097EE, OS:11.4, name:iPhone X }

        Ineligible destinations for the "Alamofire iOS" scheme:
                { platform:iOS, id:dvtdevice-DVTiPhonePlaceholder-iphoneos:placeholder, name:Generic iOS Device }
                { platform:iOS Simulator, id:dvtdevice-DVTiOSDeviceSimulatorPlaceholder-iphonesimulator:placeholder, name:Generic iOS Simulator Device }
```

references
https://github.com/Carthage/Carthage/issues/2364
https://stackoverflow.com/questions/27338042/xcode-simulator-not-coming-up-reinstall-possible/48066998
